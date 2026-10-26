import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';

const API_URL = 'http://localhost:5000/api/file';

function DeleteContent() {
  const [fileLines, setFileLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [result, setResult] = useState('');

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

  // Delete specific line
  const handleDeleteLine = async (lineNum) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/line/${lineNum}`);
      toast.success(res.data.message);
      setResult(res.data.data.content);
      setDeleteTarget(null);
      fetchLines();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error deleting line');
    } finally {
      setLoading(false);
    }
  };

  // Delete all content
  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(API_URL);
      toast.success(res.data.message);
      setResult('');
      setShowConfirm(false);
      fetchLines();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error clearing file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>🗑️ Delete Content</h1>
        <p>Remove lines or clear all content from <code>file.txt</code></p>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ borderColor: 'var(--danger)' }}>
        <div className="card-header">
          <h2 style={{ color: 'var(--danger)' }}>
            <FiAlertTriangle /> Danger Zone
          </h2>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '15px' }}>
          This will permanently remove ALL content from file.txt. This action cannot be undone.
        </p>
        <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
          <FiTrash2 /> Delete All Content
        </button>
      </div>

      {/* Lines Table */}
      <div className="card">
        <div className="card-header">
          <h2>📋 File Lines (click 🗑️ to delete a line)</h2>
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
                      className="btn-icon delete"
                      onClick={() => setDeleteTarget(idx + 1)}
                      title="Delete this line"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>
            File is empty. Nothing to delete.
          </p>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="card">
          <div className="card-header">
            <h2>📄 Updated File</h2>
          </div>
          <div className="file-content">{result}</div>
        </div>
      )}

      {/* Delete Line Confirmation Modal */}
      {deleteTarget !== null && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>⚠️ Delete Line {deleteTarget}?</h3>
            <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>
              Are you sure you want to delete line {deleteTarget}:
              <br />
              <code style={{ color: 'var(--danger)' }}>
                "{fileLines[deleteTarget - 1]}"
              </code>
            </p>
            <div className="btn-group">
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteLine(deleteTarget)}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button className="btn btn-info" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>🚨 Delete ALL File Content?</h3>
            <p style={{ color: 'var(--text-muted)', margin: '10px 0 20px' }}>
              This will permanently erase everything in <code>file.txt</code>.
              This cannot be undone!
            </p>
            <div className="btn-group">
              <button
                className="btn btn-danger"
                onClick={handleDeleteAll}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Yes, Delete Everything'}
              </button>
              <button className="btn btn-info" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteContent;