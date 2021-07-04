/* eslint-disable node/no-callback-literal */
import { Magic } from "magic-sdk";

const loadMagic = () => {
  return new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);
};

export const isUserLoggedIn = async () => {
  const magic = loadMagic();
  return await magic.user.isLoggedIn();
};

export const getDidTokenForEmail = async (email) => {
  const magic = loadMagic();
  return await magic.auth.loginWithMagicLink({
    email,
    redirectURI: new URL("/callback", window.location.origin).href,
  });
};

export const logoutUser = async () => {
  const magic = loadMagic();
  await magic.user.logout();
};

export const getUserMetadata = async () => {
  const magic = loadMagic();
  return await magic.user.getMetadata();
};

export const parseMagicCredential = async (credential) => {
  const magic = loadMagic();
  try {
    return await magic.auth.loginWithCredential(credential);
  } catch (error) {
    console.log(error);
    return error;
  }
};
