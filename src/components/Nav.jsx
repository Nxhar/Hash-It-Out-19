import React from 'react';
import {Link} from 'react-router-dom'


function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        AIducation
      </div>
      <div className="nav-links">
        <Link to="/">Learning</Link>
        <Link to="/editor">Editor</Link>
      </div>
    </div>
  );
}

export default Navbar;