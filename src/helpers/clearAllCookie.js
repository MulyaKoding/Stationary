import router from "next/router"
import { Cookies } from "react-cookie"

export const clearAllCookie = () => {
  const cookies = new Cookies()
  const role = cookies.get("role")
  const isSuperAdmin = /super ?admin/i.test(role)
  const allCookies = cookies.getAll()

  Object.keys(allCookies).forEach((cookie) => {
    cookies.remove(cookie, { path: "/" })
  })

  if (isSuperAdmin) {
    router?.push("/loginsuperadmin")
  } else {
    router?.push("/loginmitra")
  }
}

export const clearAllLocalStorage = () => {
  localStorage.clear()
}

export const clearAllSession = () => {
  sessionStorage.clear()
}