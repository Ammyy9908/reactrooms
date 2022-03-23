import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Room from "./screens/Room";
import { SocketContext } from "./context/socket";
import connectToSocket from "./context/socket";
import { connect } from "react-redux";
import getUser from "./utils/getUser";
import React from "react";
import Cookies from "js-cookie";
import getRooms from "./utils/getRooms";

function App({ setUser, setRooms }) {
  React.useEffect(() => {
    if (Cookies.get("token")) {
      getUser()
        .then((user) => {
          setUser(user);
        })
        .catch((e) => {
          Cookies.remove("token");
          setUser(null);
        });
    }

    // get all rooms from the server

    getRooms()
      .then((rooms) => {
        console.log(rooms);
        setRooms(rooms);
      })
      .catch((e) => {
        console.log(e);
      });
  });
  return (
    <Router>
      <SocketContext.Provider value={connectToSocket}>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route
              exact
              path="/room"
              render={(props) => {
                const id = props.match.params.id;
                return <Room id={id && id} />;
              }}
            />
          </Switch>
        </div>
      </SocketContext.Provider>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch({ type: "SET_USER", user }),
  setRooms: (rooms) => dispatch({ type: "SET_ROOMS", rooms }),
});

export default connect(null, mapDispatchToProps)(App);
