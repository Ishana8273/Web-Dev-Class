import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiSend } from 'react-icons/fi';

const API_URL = 'http://localhost:5000/api/file';

function CreateContent() {
  const [content, setContent] = useState('');
  const [mode, setMode] = useState('append');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Content cannot be empty!');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, { content, mode });
      setResult(res.data.data.content);
      toast.success(res.data.message);
      setContent('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error writing to file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1>✏️ Create / Write Content</h1>
        <p>Add new content to <code>file.txt</code></p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Mode Selection */}
          <div className="form-group">
            <label>Write Mode</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="mode"
                  value="append"
                  checked={mode === 'append'}
                  onChange={(e) => setMode(e.target.value)}
                />
                Append (Add to end)
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="mode"
                  value="overwrite"
                  checked={mode === 'overwrite'}
                  onChange={(e) => setMode(e.target.value)}
                />
                Overwrite (Replace all)
              </label>
            </div>
          </div>

          {/* Content Input */}
          <div className="form-group">
            <label>Content to Write</label>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your content here..."
              rows={6}
            />
          </div>

          <button
            type="submit"
            className={`btn ${mode === 'overwrite' ? 'btn-warning' : 'btn-success'}`}
            disabled={loading}
          >
            <FiSend />
            {loading
              ? 'Writing...'
              : mode === 'overwrite'
              ? 'Overwrite File'
              : 'Append to File'}
          </button>
        </form>
      </div>

      {/* Result Preview */}
      {result && (
        <div className="card">
          <div className="card-header">
            <h2>✅ Updated File Content</h2>
          </div>
          <div className="file-content">{result}</div>
        </div>
      )}
    </div>
  );
}

export default CreateContent;