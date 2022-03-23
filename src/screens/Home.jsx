import axios from "axios";
import React, { useContext } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Room from "../components/Room";
import { SocketContext } from "../context/socket";
import { setUser, addRoom } from "../redux/actions/_appAction";
import "./Home.css";

function Home({ user, addRoom, rooms }) {
  const [modal, setModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const socket = useContext(SocketContext);
  const [error, setError] = React.useState(false);

  React.useEffect(
    () => {
      socket(false);
    },
    //eslint-disable-next-line
    []
  );
  const handleModalClose = (e) => {
    const target_class = e.target.classList;
    console.log(target_class);

    if (target_class.contains("new-group-popup")) {
      setModal(false);
    }
  };

  const handleNewChannel = async (e) => {
    e.preventDefault();
    if (name && description) {
      try {
        const r = await axios.post(`http://localhost:5000/roomapi/new`, {
          name,
          description,
          author: {
            name: user.name,
            avatar: user.imageUrl,
            id: user._id,
          },
        });
        console.log(r.data);
        addRoom(r.data);
        setModal(false);
      } catch (err) {
        if (err.response && err.response.data) {
          console.log(err.response.data);
          const { message } = err.response.data;
          setError(message);
        }
      }
    }
  };
  return (
    <div className={`home-screen`}>
      {modal && (
        <div
          className="new-group-popup"
          onClick={handleModalClose}
          tabIndex="1"
        >
          <div className="new-group-modal">
            <div
              className={`modal-error ${error && "modal-error-show"}`}
              onClick={() => {
                setError(false);
              }}
            >
              <span>{error}</span>
            </div>
            <h3>New Channel</h3>
            <form action="" onSubmit={handleNewChannel}>
              <input
                type="text"
                placeholder="Channel Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                name="channel-desc"
                id="channel-desc"
                cols="30"
                rows="10"
                placeholder="Channel Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="form-control">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Header user={user} />

      <div className="home-body">
        <div className="user-profile">
          <div className="user-info">
            {user && (
              <>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </>
            )}
            {user && (
              <button className="new-group-btn" onClick={() => setModal(true)}>
                <div className="btn-body">
                  <span>{user ? "Create a Room" : "Login using Google"}</span>
                </div>
                <div className="new-group-btn-shadow"></div>
              </button>
            )}
          </div>
        </div>

        <div className="rooms">
          {rooms &&
            rooms.map((room, i) => {
              return <Room key={i} room={room} />;
            })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
  rooms: state.appReducer.rooms,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  addRoom: (room) => dispatch(addRoom(room)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
