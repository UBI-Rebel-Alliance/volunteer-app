import { useEffect } from "react";
import { loginUser } from "./magic";
import { apiUrl } from "../libs/config";
import { useHistory } from "react-router-dom";
import useSWR from "swr";
import { fetchGetJson } from "../libs/utils/api";

export const authenticateUser = async (email) => {
  try {
    const didToken = await loginUser(email);
    const res = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      withCredentials: true,
      credentials: "same-origin",
      body: JSON.stringify({ email }),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = async () => {
  try {
    const res = await fetch(`${apiUrl}/user/logout`, {
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const useUser = ({
  redirectTo, redirectIfFound,
}) => {
  const history = useHistory();
  const { data, mutate } = useSWR(`${apiUrl}/user`, fetchGetJson);
  let user;
  let finished;
  let hasUser;
  if (data) {
    user = data.user;
    finished = Boolean(data);
    hasUser = Boolean(user);
  }
  useEffect(() => {
    if (!redirectTo || !finished) return;
    if (
      (redirectTo && !redirectIfFound && !hasUser) ||
      (redirectIfFound && hasUser)
    ) {
      history.replace(redirectTo);
    }
  }, [redirectTo, redirectIfFound, finished, hasUser]);

  return {
    user,
    mutate,
  };
};
