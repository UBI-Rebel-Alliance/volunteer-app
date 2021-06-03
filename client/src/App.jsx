/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Link, withRouter, useLocation, Redirect, BrowserRouter as Router } from "react-router-dom";
// import Mint from "./components/Mint";
// import ViewBadge from "./components/ViewBadge";
import { UserContext } from "./context/UserContext";
import { checkUser } from "./services/magic";
import Authenticate from "./components/Authenticate";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "react-bootstrap/Spinner";
import CreateBadge from "./pages/CreateBadge/CreateBadge";
import ClaimBadge from "./pages/Claim Your Badge/ClaimBadge";
import AssignBadge from "./pages/Assign Badge/AssignBadge";
import BadgeProfile from "./pages/Badge Profile/BadgeProfile";
import ManageBadges from "./pages/Manage Badges/ManageBadges";
import Header from "./pages/Header/Header";
import Navbar from "./pages/Header/Navbar";
import Pinata from "./pages/Pinata";

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, email: "" });
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
  }, [user.isLoggedIn]);

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
  return (
    <div className="App">
      { location.pathname === "/claimbadge" ? null : location.pathname === "/badgeprofile" ? <Navbar /> : <Header />}
      <UserContext.Provider value={user}>
        <Router>
          {/* change /dashboard */}
          {user.isLoggedIn && <Redirect to={{ pathname: "/dashboard" }} />}
          <Switch >           
            <div className="app-body">
              {/* <h1>Badges Module</h1> */}
              {/* <Mint />
        <ViewBadge /> */}
              <Route path="/" render={routerProps => <Authenticate setStatus={setUser} routerProps={routerProps} />} />
              <Route path="/createbadge" render={routerProps => <CreateBadge routerProps={routerProps} />} />
              <Route path="/claimbadge" render={routerProps => <ClaimBadge routerProps={routerProps} />} />
              <Route path="/assignbadge" render={routerProps => <AssignBadge routerProps={routerProps} />} />
              <Route path="/badgeprofile" render={routerProps => <BadgeProfile routerProps={routerProps} />} />
              <Route path="/managebadges" render={routerProps => <ManageBadges routerProps={routerProps} />} />
            </div>
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
