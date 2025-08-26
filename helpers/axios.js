import axios from "axios"
import { Cookies } from "react-cookie"
import {
  clearAllCookie,
  clearAllLocalStorage,
  clearAllSession
} from "./clearAllCookie"

const axiosClient = axios.create({
  // all axios can be used, shown in axios documentation
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
})

axiosClient.interceptors.request.use((axiosConfig) => {
  const cookies = new Cookies()
  const token = cookies.get("token")
  if (token) axiosConfig.headers.Authorization = `${token}`

  return axiosConfig
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error?.response ? error?.response?.status : null
    if (status === 401) {
      clearAllCookie()
      clearAllLocalStorage()
      clearAllSession()
    }
    return Promise.reject(error)
  }
)

export default axiosClient
