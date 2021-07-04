/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect, BrowserRouter as Router } from "react-router-dom";
import { UserContext } from "./components/Context/UserContext";
import { isUserLoggedIn, getUserMetadata } from "./services/magic";
import { BadgeProfile } from "./pages/BadgeProfile/BadgeProfile";
import { Callback } from "./components/Auth/Callback";
import { Login } from "./components/Auth/Login";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setUser({ loading: true });
    isUserLoggedIn()
      ? setUser({ user: getUserMetadata() })
      : setUser({ user: null });
  }, []);

  return (
    <div className="App">
      <div className="app-body">
        <Router>
          <Switch >
            <UserContext.Provider value={[user, setUser]}>
              <Route exact path="/" component={BadgeProfile} />
              <Route path="/login" component={Login}/>
              <Route path="/callback" component={Callback}/>
              {/*
              <Route path="/createbadge" render={routerProps => <CreateBadge routerProps={routerProps} />} />
              <Route path="/claimbadge" render={routerProps => <ClaimBadge routerProps={routerProps} />} />
              <Route path="/assignbadge" render={routerProps => <AssignBadge routerProps={routerProps} />} />
              <Route path="/badgeprofile" render={routerProps => <BadgeProfile routerProps={routerProps} />} />
              <Route path="/managebadges" render={routerProps => <ManageBadges routerProps={routerProps} />} />
              */}
            </UserContext.Provider>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
