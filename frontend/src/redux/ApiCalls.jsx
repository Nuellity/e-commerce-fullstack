import { publicRequest } from "../axiosRequest";
import { loginFailure, loginStart, loginSuccess } from "./userSlice"




export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/signin", user);
        dispatch(loginSuccess(res.data))
    } catch (error) {
        if (error.response.status === 401) {
            dispatch(loginFailure(error.response.data))
          } else {
            console.log(error);
          }
        
       
    }
}