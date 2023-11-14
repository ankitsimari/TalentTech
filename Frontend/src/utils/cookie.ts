import Cookies from "js-cookie";

const TOKEN_COOKIE_NAME = "token";

export const setAuthCookies = (token: string): void => {
  Cookies.set(TOKEN_COOKIE_NAME, token, { expires: 1 });
};

export const getAuthTokenFromCookie = (): string | undefined => {
  return Cookies.get(TOKEN_COOKIE_NAME);
};

export const removeAuthCookies = (): void => {
  //Cookies.remove(TOKEN_COOKIE_NAME);
  Cookies.remove(TOKEN_COOKIE_NAME, { path: "/" })
};
