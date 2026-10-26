import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FiRefreshCw } from 'react-icons/fi';

const API_URL = 'http://localhost:5000/api/file';

function ReadFile() {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFile = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API_URL);
      setFileData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch file');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFile();
  }, [fetchFile]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading file...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>📖 Read File</h1>
        <p>Current contents of <code>file.txt</code></p>
      </div>

      {error && <div className="status status-error">❌ {error}</div>}

      {fileData && (
        <>
          {/* Meta Info */}
          <div className="meta-grid">
            <div className="meta-item">
              <div className="value">{fileData.lineCount}</div>
              <div className="label">Lines</div>
            </div>
            <div className="meta-item">
              <div className="value">{fileData.size}</div>
              <div className="label">File Size</div>
            </div>
            <div className="meta-item">
              <div className="value">
                {new Date(fileData.lastModified).toLocaleTimeString()}
              </div>
              <div className="label">Last Modified</div>
            </div>
          </div>

          {/* Raw Content */}
          <div className="card">
            <div className="card-header">
              <h2>📄 Raw Content</h2>
              <button className="btn btn-info" onClick={fetchFile}>
                <FiRefreshCw /> Refresh
              </button>
            </div>
            <div className="file-content">
              {fileData.content || '(empty file)'}
            </div>
          </div>

          {/* Line by Line */}
          <div className="card">
            <div className="card-header">
              <h2>📋 Line by Line</h2>
            </div>
            {fileData.lines.length > 0 ? (
              <table className="lines-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Content</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData.lines.map((line, idx) => (
                    <tr key={idx}>
                      <td className="line-number">{idx + 1}</td>
                      <td>{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: 'var(--text-muted)', padding: '20px', textAlign: 'center' }}>
                No lines found. The file is empty.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ReadFile;