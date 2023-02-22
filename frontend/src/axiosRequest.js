import axios from "axios"


const BASE_URL = "http://localhost:4000/api/"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTM3ZDE0OWI2YTc1NzI0N2NhNGJiMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NzA1NzYwOSwiZXhwIjoxNjc3MTQ0MDA5fQ.fDT9U8S4VSU2aYrXYtpapsTBzNWFyvL89PeXOlZjKec"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${token}`}
})