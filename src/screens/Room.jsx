import React from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
import ChatBody from "../components/ChatBody";
import "./Room.css";
import { connect } from "react-redux";
import SidebarRoom from "../components/SidebarRoom";
import getRoom from "../utils/getRoom";
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

let socket = io.connect("https://group-chat-serverreact.herokuapp.com", {
  transports: ["websocket"],
});

function Room({ user }) {
  let query = useQuery();
  //eslint-disable-next-line

  const [messages, setMessages] = React.useState([]);
  const [typing, setTyping] = React.useState(false);
  const [roomUsers, setUsers] = React.useState([]);
  const [room, setRoom] = React.useState(null);

  const room_id = query.get("id");
  const name = query.get("name");

  //fetch room information from the server using room id

  React.useEffect(() => {
    getRoom(room_id)
      .then((room_data) => {
        console.log(room_data);
        setRoom(room_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [room_id, name]);

  React.useEffect(
    () => {
      //Join Request
      user && socket.emit("join", { user, roomname: name });

      return () => socket.close();
    },
    //eslint-disable-next-line
    []
  );

  React.useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("channel-message", (message) => {
      console.log("Channel Message", message);
      setMessages([...messages, message]);
      setTyping(false);
    });

    socket.on("roomUsers", ({ room, users }) => {
      console.log("Room Info", room);
      console.log("Users", users);
      setUsers(users);
    });
  }, [messages]);

  return (
    <div className="room-screen">
      <SidebarRoom room={room && room} roomUsers={roomUsers} name={name} />
      <ChatBody
        socket={socket}
        messages={messages}
        typing={typing}
        setTyping={setTyping}
        name={room && room.name}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
});

export default connect(mapStateToProps, null)(Room);
