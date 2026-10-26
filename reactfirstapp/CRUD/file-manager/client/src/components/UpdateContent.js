import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiRefreshCw, FiEdit } from 'react-icons/fi';

const API_URL = 'http://localhost:5000/api/file';

function UpdateContent() {
  const [updateMode, setUpdateMode] = useState('findReplace');
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [lineNumber, setLineNumber] = useState('');
  const [newLineContent, setNewLineContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileLines, setFileLines] = useState([]);
  const [result, setResult] = useState('');

  // Modal for inline editing
  const [editModal, setEditModal] = useState(null);
  const [editValue, setEditValue] = useState('');

  const fetchLines = async () => {
    try {
      const res = await axios.get(API_URL);
      setFileLines(res.data.data.lines);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLines();
  }, []);

  // Find & Replace
  const handleFindReplace = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      toast.error('Search text is required!');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(API_URL, { searchText, replaceText });
      setResult(res.data.data.content);
      toast.success(res.data.message);
      setSearchText('');
      setReplaceText('');
      fetchLines();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating file');
    } finally {
      setLoading(false);
    }
  };

  // Update specific line
  const handleUpdateLine = async (e) => {
    e.preventDefault();
    const ln = parseInt(lineNumber);
    if (!ln || ln < 1) {
      toast.error('Enter a valid line number');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/line/${ln}`, {
        newContent: newLineContent,
      });
      setResult(res.data.data.content);
      toast.success(res.data.message);
      setLineNumber('');
      setNewLineContent('');
      fetchLines();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating line');
    } finally {
      setLoading(false);
    }
  };

  // Inline edit from table
  const handleInlineEdit = async () => {
    if (editModal === null) return;
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/line/${editModal}`, {
        newContent: editValue,
      });
      toast.success(res.data.message);
      setEditModal(null);
      setEditValue('');
      fetchLines();
      setResult(res.data.data.content);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>🔄 Update Content</h1>
        <p>Modify existing content in <code>file.txt</code></p>
      </div>

      {/* Mode Toggle */}
      <div className="card">
        <div className="form-group">
          <label>Update Method</label>
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="updateMode"
                value="findReplace"
                checked={updateMode === 'findReplace'}
                onChange={(e) => setUpdateMode(e.target.value)}
              />
              Find & Replace
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="updateMode"
                value="lineEdit"
                checked={updateMode === 'lineEdit'}
                onChange={(e) => setUpdateMode(e.target.value)}
              />
              Edit by Line Number
            </label>
          </div>
        </div>

        {/* Find & Replace Form */}
        {updateMode === 'findReplace' && (
          <form onSubmit={handleFindReplace}>
            <div className="form-group">
              <label>Search For</label>
              <input
                className="form-input"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Text to find..."
              />
            </div>
            <div className="form-group">
              <label>Replace With</label>
              <input
                className="form-input"
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replacement text..."
              />
            </div>
            <button type="submit" className="btn btn-warning" disabled={loading}>
              <FiRefreshCw />
              {loading ? 'Updating...' : 'Find & Replace'}
            </button>
          </form>
        )}

        {/* Line Edit Form */}
        {updateMode === 'lineEdit' && (
          <form onSubmit={handleUpdateLine}>
            <div className="form-group">
              <label>Line Number</label>
              <input
                className="form-input"
                type="number"
                min="1"
                value={lineNumber}
                onChange={(e) => setLineNumber(e.target.value)}
                placeholder="e.g. 2"
              />
            </div>
            <div className="form-group">
              <label>New Content for This Line</label>
              <input
                className="form-input"
                type="text"
                value={newLineContent}
                onChange={(e) => setNewLineContent(e.target.value)}
                placeholder="Enter new line content..."
              />
            </div>
            <button type="submit" className="btn btn-warning" disabled={loading}>
              <FiEdit />
              {loading ? 'Updating...' : 'Update Line'}
            </button>
          </form>
        )}
      </div>

      {/* Current Lines Table */}
      <div className="card">
        <div className="card-header">
          <h2>📋 Current Lines (click ✏️ to edit)</h2>
          <button className="btn btn-info" onClick={fetchLines}>
            <FiRefreshCw /> Refresh
          </button>
        </div>
        {fileLines.length > 0 ? (
          <table className="lines-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Content</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fileLines.map((line, idx) => (
                <tr key={idx}>
                  <td className="line-number">{idx + 1}</td>
                  <td>{line}</td>
                  <td>
                    <button
                      className="btn-icon edit"
                      onClick={() => {
                        setEditModal(idx + 1);
                        setEditValue(line);
                      }}
                      title="Edit this line"
                    >
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
            File is empty.
          </p>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="card">
          <div className="card-header">
            <h2>✅ Updated File</h2>
          </div>
          <div className="file-content">{result}</div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal !== null && (
        <div className="modal-overlay" onClick={() => setEditModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>✏️ Edit Line {editModal}</h3>
            <div className="form-group">
              <label>New Content</label>
              <input
                className="form-input"
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
              />
            </div>
            <div className="btn-group">
              <button className="btn btn-warning" onClick={handleInlineEdit} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button className="btn btn-danger" onClick={() => setEditModal(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateContent;