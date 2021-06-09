import { loginUser } from "./magic";

export const authenticateUser = async (email) => {
  try {
    const didToken = await loginUser(email);
    console.log("didToken: ", didToken);
    const res = await fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
      body: JSON.stringify({ email }),
    });
    console.log("Authenticate Response: ", res);
  } catch (error) {
    console.log(error);
  }
};
