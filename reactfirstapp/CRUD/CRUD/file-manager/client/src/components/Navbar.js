import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiFile, FiEye, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

function Navbar() {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home', icon: <FiFile /> },
    { path: '/read', label: 'Read', icon: <FiEye /> },
    { path: '/create', label: 'Create', icon: <FiPlus /> },
    { path: '/update', label: 'Update', icon: <FiEdit /> },
    { path: '/delete', label: 'Delete', icon: <FiTrash2 /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="icon">📂</span>
          File Manager
        </Link>
        <ul className="navbar-links">
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;