import Cookies from "js-cookie";

const TOKEN_COOKIE_NAME = "token";
const USERNAME_COOKIE_NAME = "username";

export const setAuthCookies = (token: string, username: string): void => {
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 1 });
  Cookies.set(USERNAME_COOKIE_NAME, username, { expires: 1 });
};

export const getAuthTokenFromCookie = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

export const getUsernameFromCookie = (): string | undefined => {
  return Cookies.get(USERNAME_COOKIE_NAME);
};

export const removeAuthCookies = (): void => {
  Cookies.remove(TOKEN_COOKIE_NAME);
  Cookies.remove(USERNAME_COOKIE_NAME);
};
