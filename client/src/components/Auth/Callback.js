import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { parseMagicCredential, getUserMetadata } from "../../services/magic";
import { authenticateUser } from "../../services/user";
import { Loading } from "../Loading";

export const Callback = (props) => {
  const history = useHistory();
  const [setUser] = useContext(UserContext);

  useEffect(() => {
    const provider = new URLSearchParams(window.location.search).get("provider");
    !provider && finishEmailRedirectLogin();
  }, [window.location.search]);

  const finishEmailRedirectLogin = async () => {
    const magicCredential = new URLSearchParams(window.location.search).get("magic_credential");
    if (magicCredential) {
      const didToken = await parseMagicCredential(magicCredential);
      const response = await authenticateUser(didToken);
      if (response.status === 200) {
        const userMetadata = await getUserMetadata();
        setUser({ user: userMetadata });
        history.push("/profile");
      }
    }
  };
  return <Loading />;
};
