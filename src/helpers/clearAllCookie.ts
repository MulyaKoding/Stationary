import router from "next/router";
import { Cookies } from "react-cookie";

// Type definition for cookie values
type CookieValue = string | undefined;

// Type definition for all cookies object
interface AllCookies {
  [key: string]: CookieValue;
}

export const clearAllCookie = (): void => {
  const cookies: Cookies = new Cookies();
  const role: CookieValue = cookies.get("role");
  const isSuperAdmin: boolean = /super ?admin/i.test(role || "");
  const allCookies: AllCookies = cookies.getAll();

  Object.keys(allCookies).forEach((cookie: string): void => {
    cookies.remove(cookie, { path: "/" });
  });

  if (isSuperAdmin) {
    router?.push("/loginsuperadmin");
  } else {
    router?.push("/loginmitra");
  }
};

export const clearAllLocalStorage = (): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.clear();
  }
};

export const clearAllSession = (): void => {
  if (typeof window !== "undefined" && window.sessionStorage) {
    sessionStorage.clear();
  }
};