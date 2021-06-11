/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Link, withRouter, useLocation, Redirect, BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "./components/Context/UserContext";
import { checkUser } from "./services/magic";
import { LoginForm } from "./components/Auth/LoginForm";
import { LogoutButton } from "./components/Auth/Logout";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import Spinner from "react-bootstrap/Spinner";
import CreateBadge from "./pages/CreateBadge/CreateBadge";
import ClaimBadge from "./pages/Claim Your Badge/ClaimBadge";
import AssignBadge from "./pages/Assign Badge/AssignBadge";
import BadgeProfile from "./pages/Badge Profile/BadgeProfile";
import ManageBadges from "./pages/Manage Badges/ManageBadges";
import Header from "./pages/Header/Header";
import Navbar from "./pages/Header/Navbar";
import Pinata from "./pages/Pinata";
import { useUser } from "./services/user";

function App() {
  const [users, setUser] = useState({ isLoggedIn: false, email: "" });
  const { user } = useUser({ redirectTo: "/login" });
  console.log("useUser: ", user);
  const [loading, setLoading] = useState();
  useEffect(() => {
    const validateUser = async () => {
      setLoading(true);
      try {
        await checkUser(setUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    validateUser();
  }, [users.isLoggedIn]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  const location = useLocation();

  // if (user) {
  return (
    <div className="App">
      <Router>
        <Switch >
          <div className="app-body">

            {!user
              ? <Route path="/login" component={LoginForm} />
              : <Route path="/badgeprofile" render={routerProps => <BadgeProfile routerProps={routerProps} />} />
            }
            {/*
                <Route path="/createbadge" render={routerProps => <CreateBadge routerProps={routerProps} />} />
                <Route path="/claimbadge" render={routerProps => <ClaimBadge routerProps={routerProps} />} />
                <Route path="/assignbadge" render={routerProps => <AssignBadge routerProps={routerProps} />} />
                <Route path="/managebadges" render={routerProps => <ManageBadges routerProps={routerProps} />} />
            */}
          </div>
        </Switch>
      </Router>
    </div>
  );
  // }
  /*
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        { location.pathname === "/claimbadge" ? null : location.pathname === "/badgeprofile" ? <Navbar /> : <Header />}
        <Router>
          {user.isLoggedIn
            ? <Redirect to={{ pathname: "/badgeprofile" }} />
            : <Redirect to={{ pathname: "/login" }} />
          }
          <Switch >
            <div className="app-body">
              <Route exact path="/login" component={LoginForm} />
              <Route path="/createbadge" render={routerProps => <CreateBadge routerProps={routerProps} />} />
              <Route path="/claimbadge" render={routerProps => <ClaimBadge routerProps={routerProps} />} />
              <Route path="/assignbadge" render={routerProps => <AssignBadge routerProps={routerProps} />} />
              <Route path="/badgeprofile" render={routerProps => <BadgeProfile routerProps={routerProps} />} />
              <Route path="/managebadges" render={routerProps => <ManageBadges routerProps={routerProps} />} />
            </div>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
  */
}

export default App;
