import React from "react";
import "./ChatBody.css";
import { MdSend } from "react-icons/md";
import { connect } from "react-redux";

function Chat({ avatar, uname, time, message }) {
  const words = uname.split(" ");
  return (
    <div className="chat">
      <div className="chat-avatar">
        {/* {avatar && <img src={avatar} alt="" />} */}
        <span>
          {words.length >= 2 &&
            words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()}
          {words.length === 1 && words[0].charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="chat-meta">
        <div className="chat-meta-info">
          <span className="chat-author">{uname}</span>
          <span>{time}</span>
        </div>
        <p className="chat-message">{message}</p>
      </div>
    </div>
  );
}
function ChatBody({ socket, messages, user, name }) {
  const [message, setMessage] = React.useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("chatmessage", message);
    setMessage("");
    // socket.off("chatmessage");
  };

  return (
    <div className="chat-body">
      <div className="chat-header">
        <h3>{name}</h3>
      </div>

      <div className="chat-body-wrapper">
        <div className="chats-group">
          {messages &&
            messages.length > 0 &&
            messages.map((msg) => {
              return (
                <Chat
                  uname={socket.id === msg.user.id ? "You" : msg.user.name}
                  avatar={msg.user.avatar}
                  message={msg.message}
                  time={msg.time}
                />
              );
            })}
        </div>
      </div>

      <form className="new-chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="send-btn" type="submit">
          <MdSend />
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
});
export default connect(mapStateToProps, null)(ChatBody);
