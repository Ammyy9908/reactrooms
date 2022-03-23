import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Room.css";
import Cookies from "js-cookie";
import axios from "axios";
import GoogleLogin from "react-google-login";

const responseGoogle = async (response) => {
  console.log(response);
  const { profileObj } = response;
  if (profileObj) {
    const { email, name, imageUrl } = profileObj;

    try {
      const r = await axios.post(
        `https://group-chat-serverreact.herokuapp.com/api/login`,
        {
          email,
          name,
          imageUrl,
        }
      );
      console.log(r.data);
      const { token } = r.data;
      Cookies.set("token", token);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
};

function Room({ room, user }) {
  return (
    <div className="room">
      <div className="room-info">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        {user ? (
          <Link
            to={`/room?id=${room._id}&name=${room.name}`}
            className="join_btn"
          >
            Join Room
          </Link>
        ) : (
          <GoogleLogin
            clientId="726425264782-mfrlshpct6i6k5sqacjqvdnvunu6jnit.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="new-group-btn join_btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <div className="btn-body">
                  <span>Login in to Join</span>
                </div>
                <div className="new-group-btn-shadow"></div>
              </button>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.appReducer.user,
});

export default connect(mapStateToProps, null)(Room);
