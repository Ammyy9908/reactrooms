import React from "react";
import "./RoomSidebar.css";
import { IoIosArrowBack } from "react-icons/io";
import { connect } from "react-redux";

function User({ name }) {
  const words = name.split(" ");
  return (
    <div className="user">
      <div className="user-avatar">
        <span>
          {words.length >= 2 &&
            words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()}
          {words.length === 1 && words[0].charAt(0).toUpperCase()}
        </span>
      </div>
      <h3>{name}</h3>
    </div>
  );
}
function Sidebar({ roomUsers, room }) {
  return (
    <div className="room-sidebar">
      <div className="sidebar-header">
        <a href="/" className="back-btn">
          <IoIosArrowBack />
        </a>
        <h3>All Channels</h3>
      </div>
      <div className="room-info">
        <h3>{room && room.name}</h3>
        <p>{room && room.description}</p>
      </div>

      <div className="room-sidebar-users">
        <h3>Room Users</h3>
        <div className="sidebar-user-list">
          {roomUsers.map((user) => {
            return (
              <User
                name={user.name}
                color="#E7A977"
                id="4"
                avatar={user.avatar}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
});

export default connect(mapStateToProps, null)(Sidebar);
