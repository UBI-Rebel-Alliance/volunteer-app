/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { authenticateUser } from "../../services/user";
import { getUserMetadata, getDidTokenForEmail } from "../../services/magic";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    user && user.issuer && history.push("/profile");
  }, [user, history]);

  const handleSubmit = async (email) => {
    try {
      console.log("Email: ", email);
      setDisabled(true);
      const didToken = await getDidTokenForEmail(email);
      const response = await authenticateUser(didToken);
      if (response.status === 200) {
        const userMetadata = await getUserMetadata();
        setUser({ user: userMetadata });
        history.push("/profile");
      }
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  };
  return (
    <div>
      <LoginForm disabled={disabled} handleEmailSubmit={handleSubmit}/>
    </div>
  );
};
