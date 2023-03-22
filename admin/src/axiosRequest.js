import axios from "axios"


const BASE_URL = "http://localhost:4000/api/"


// const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accesstoken
// console.log(token)
// const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accesstoken
//  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MGM3ZjA1NWE0ZDZjNWEwOGEzMDE4NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3OTIzNzA1MSwiZXhwIjoxNjc5MjQ0MjUxfQ.TevnQ1DAYYWM_agS3nMvQhUTQvxhp8WTeCStd72ERjE"
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const token = currentUser?.accesstoken;
console.log(token)

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

