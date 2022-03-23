import React from "react";
import "./Header.css";
import Cookies from "js-cookie";
function Header({ user }) {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
  };
  return (
    <div className="header">
      <div className="header-wrapper">
        <a href="#app-name" className="app-name">
          React Rooms
        </a>
    {user && <a href="#user" className="user-acount" onClick={handleLogout}>
          Logout
        </a>}
      </div>
    </div>
  );
}

export default Header;
