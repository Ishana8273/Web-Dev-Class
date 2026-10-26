import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ReadFile from './components/ReadFile';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import DeleteContent from './components/DeleteContent';

function App() {
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read" element={<ReadFile />} />
          <Route path="/create" element={<CreateContent />} />
          <Route path="/update" element={<UpdateContent />} />
          <Route path="/delete" element={<DeleteContent />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;