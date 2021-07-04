import { apiUrl } from "../libs/config";

export const authenticateUser = async (didToken) => {
  try {
    const res = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const signOutUser = async () => {
//   try {
//     const res = await fetch(`${apiUrl}/user/logout`, {
//       method: "POST",
//     });
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };
