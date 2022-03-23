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
        <a href="#user" className="user-acount" onClick={handleLogout}>
          {user ? "Logout" : "Login"}
        </a>
      </div>
    </div>
  );
}

export default Header;
