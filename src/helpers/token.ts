import { Cookies } from "react-cookie";

// Initialize cookies instance
const cookies: Cookies = new Cookies();

/**
 * Retrieves the authentication token from cookies
 * @returns The token string if exists, undefined otherwise
 */
const getToken = (): string | undefined => {
  return cookies.get("token");
};

export { getToken };