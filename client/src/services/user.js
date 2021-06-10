import { loginUser } from "./magic";

export const authenticateUser = async (email) => {
  try {
    const didToken = await loginUser(email);
    const res = await fetch("http://localhost:8000/user/login", {
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
    const res = await fetch("http://localhost:8000/user/logout", {
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
