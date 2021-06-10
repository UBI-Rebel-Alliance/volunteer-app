/* eslint-disable node/no-callback-literal */
import { Magic } from "magic-sdk";

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);

export const checkUser = async (cb) => {
  const isLoggedIn = await magic.user.isLoggedIn();
  if (isLoggedIn) {
    const user = await magic.user.getMetadata();
    return cb({ isLoggedIn: true, email: user.email });
  }
  return cb({ isLoggedIn: false });
};

export const loginUser = async (email) => {
  return await magic.auth.loginWithMagicLink({ email });
};

export const logoutUser = async () => {
  await magic.user.logout();
};

export const getDidToken = async () => {
  try {
    return await magic.user.generateIdToken();
  } catch (error) {
    console.log(error);
  }
};
