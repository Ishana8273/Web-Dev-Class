const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const FILE_PATH = path.join(__dirname, '..', 'file.txt');

// ==========================================
// 1. READ - GET /api/file
// ==========================================
router.get('/', (req, res) => {
  try {
    // Check if file exists
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, '', 'utf-8');
    }

    const content = fs.readFileSync(FILE_PATH, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');

    res.status(200).json({
      success: true,
      message: 'File read successfully',
      data: {
        content: content,
        lines: lines,
        lineCount: lines.length,
        size: `${Buffer.byteLength(content, 'utf-8')} bytes`,
        lastModified: fs.statSync(FILE_PATH).mtime
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading file',
      error: error.message
    });
  }
});

// ==========================================
// 2. CREATE / APPEND - POST /api/file
// ==========================================
router.post('/', (req, res) => {
  try {
    const { content, mode } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Content cannot be empty'
      });
    }

    if (mode === 'overwrite') {
      // Overwrite entire file
      fs.writeFileSync(FILE_PATH, content, 'utf-8');
    } else {
      // Append to file (default)
      const existingContent = fs.readFileSync(FILE_PATH, 'utf-8');
      const newContent = existingContent
        ? existingContent + '\n' + content
        : content;
      fs.writeFileSync(FILE_PATH, newContent, 'utf-8');
    }

    const updatedContent = fs.readFileSync(FILE_PATH, 'utf-8');

    res.status(201).json({
      success: true,
      message: mode === 'overwrite'
        ? 'File overwritten successfully'
        : 'Content appended successfully',
      data: { content: updatedContent }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error writing to file',
      error: error.message
    });
  }
});

// ==========================================
// 3. UPDATE - PUT /api/file
// ==========================================
router.put('/', (req, res) => {
  try {
    const { searchText, replaceText } = req.body;

    if (!searchText) {
      return res.status(400).json({
        success: false,
        message: 'Search text is required'
      });
    }

    let content = fs.readFileSync(FILE_PATH, 'utf-8');

    if (!content.includes(searchText)) {
      return res.status(404).json({
        success: false,
        message: `Text "${searchText}" not found in file`
      });
    }

    // Replace all occurrences
    const updatedContent = content.split(searchText).join(replaceText || '');
    fs.writeFileSync(FILE_PATH, updatedContent, 'utf-8');

    res.status(200).json({
      success: true,
      message: `Replaced "${searchText}" with "${replaceText || ''}" successfully`,
      data: { content: updatedContent }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating file',
      error: error.message
    });
  }
});

// ==========================================
// 4. UPDATE LINE - PUT /api/file/line/:lineNumber
// ==========================================
router.put('/line/:lineNumber', (req, res) => {
  try {
    const lineNumber = parseInt(req.params.lineNumber);
    const { newContent } = req.body;

    let content = fs.readFileSync(FILE_PATH, 'utf-8');
    let lines = content.split('\n');

    if (lineNumber < 1 || lineNumber > lines.length) {
      return res.status(400).json({
        success: false,
        message: `Line ${lineNumber} does not exist. File has ${lines.length} lines.`
      });
    }

    const oldLine = lines[lineNumber - 1];
    lines[lineNumber - 1] = newContent || '';
    const updatedContent = lines.join('\n');
    fs.writeFileSync(FILE_PATH, updatedContent, 'utf-8');

    res.status(200).json({
      success: true,
      message: `Line ${lineNumber} updated successfully`,
      data: {
        oldLine: oldLine,
        newLine: newContent,
        content: updatedContent
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating line',
      error: error.message
    });
  }
});

// ==========================================
// 5. DELETE LINE - DELETE /api/file/line/:lineNumber
// ==========================================
router.delete('/line/:lineNumber', (req, res) => {
  try {
    const lineNumber = parseInt(req.params.lineNumber);

    let content = fs.readFileSync(FILE_PATH, 'utf-8');
    let lines = content.split('\n');

    if (lineNumber < 1 || lineNumber > lines.length) {
      return res.status(400).json({
        success: false,
        message: `Line ${lineNumber} does not exist. File has ${lines.length} lines.`
      });
    }

    const deletedLine = lines.splice(lineNumber - 1, 1)[0];
    const updatedContent = lines.join('\n');
    fs.writeFileSync(FILE_PATH, updatedContent, 'utf-8');

    res.status(200).json({
      success: true,
      message: `Line ${lineNumber} deleted successfully`,
      data: {
        deletedLine: deletedLine,
        content: updatedContent
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting line',
      error: error.message
    });
  }
});

// ==========================================
// 6. DELETE ALL - DELETE /api/file
// ==========================================
router.delete('/', (req, res) => {
  try {
    fs.writeFileSync(FILE_PATH, '', 'utf-8');

    res.status(200).json({
      success: true,
      message: 'All file content deleted successfully',
      data: { content: '' }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting file content',
      error: error.message
    });
  }
});

module.exports = router;