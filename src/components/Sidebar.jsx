import React from "react";
import "./Sidebar.css";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import GoogleLogin from "react-google-login";
import { AiOutlinePlus } from "react-icons/ai";
import { GoSearch } from "react-icons/go";
import { HiUserCircle } from "react-icons/hi";
import { FaMountain } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Channel({ id, name, color }) {
  const words = name.split(" ");
  return (
    <Link to={`/room?id=${id}&name=${name}`} className="channel-wrapper">
      <div className="channel">
        <div className="channel-avatar">
          <div
            className="avatar-ripple"
            style={{ backgroundColor: color }}
          ></div>
          <span>
            {words.length >= 2 &&
              words[0].charAt(0).toUpperCase() +
                words[1].charAt(0).toUpperCase()}
            {words.length === 1 && words[0].charAt(0).toUpperCase()}
          </span>
        </div>
        <h3>{name}</h3>
      </div>
    </Link>
  );
}
function Sidebar({ setModal, user, setUser, room }) {
  const [dropdown, setDropdown] = React.useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const responseGoogle = async (response) => {
    const { profileObj } = response;
    if (!profileObj) {
      return alert("There is an error while login");
    }
    // setUser(profileObj);
    console.log(profileObj);
    const { email, name, imageUrl } = profileObj;

    try {
      const r = await axios.post(`http://localhost:5000/api/login`, {
        email,
        name,
        imageUrl,
      });
      console.log(r.data);
      const { token } = r.data;
      Cookies.set("token", token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <a href="/" className="back-btn">
          <IoIosArrowBack />
        </a>
        <h3>All Channels</h3>
        {!room && (
          <button className="new-channel-btn" onClick={() => setModal(true)}>
            <AiOutlinePlus />
          </button>
        )}
      </div>
      <div className="sidebar-searchbar">
        <div className="search-wrapper">
          <GoSearch />
          <input type="text" name="key" id="key" placeholder="Search" />
        </div>
      </div>

      <div className="sidebar-channel-list">
        <Channel name="Front-end developers" color="#01579B" id="1" />
        <Channel name="random" color="#33691E" id="2" />
        <Channel name="BACK-END" color="#424242" id="3" />
        <Channel name="CATS AND DOGS" color="#E7A977" id="4" />
        <Channel name="Welcome" color="#258EA6" id="5" />
      </div>

      <div className="sidebar-footer">
        {user ? (
          <div className="sidebar-footer-wrapper">
            <div className="sidebar-footer-left">
              <div className="sidebar-user-avatar">
                <img src={user.imageUrl} alt="" />
              </div>
              <h3>{user.name}</h3>
            </div>
            <div className="sidebar-footer-right">
              <button onClick={handleDropdown}>
                <IoIosArrowDown />
                <div
                  className={`account-dropdown ${dropdown && "dropdown-show"}`}
                >
                  <div className="account-dropdown-wrapper">
                    <div className="account-option">
                      <HiUserCircle /> <p>My Profile</p>
                    </div>
                    <div className="account-option">
                      <FaMountain /> <p>Tweeter</p>
                    </div>
                    <div className="dropdown-seperator"></div>
                    <div className="account-option">
                      <IoMdExit /> <p>Logout</p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <GoogleLogin
            clientId="726425264782-t5jnbpjhblggp0d54kuakj5uojloulk4.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick}>Sign in with Google</button>
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

export default connect(mapStateToProps, null)(Sidebar);
