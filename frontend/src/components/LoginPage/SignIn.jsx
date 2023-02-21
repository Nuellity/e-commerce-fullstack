/* eslint-disable react-hooks/exhaustive-deps */
import { Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { loginDetails } from './LoginDetails';
import LoginIcon from "@mui/icons-material/Login";

function SignIn() {
    const { setRecover, userData, setUserData, submitData} = useContext(loginDetails);
    const [formErrors, setFormErrors] = useState({})
    const [errorState, setErrorState] = useState(false);

    const validate = (data) =>{
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!data.loginEmail){
            errors.loginEmail= "Email is required";
        }
        else if(!regex.test(data.loginEmail)){
            errors.loginEmail = "This is not a valid email format"
        }
        if(!data.loginPassword){
            errors.loginPassword= "Password is required";
        }
        
        return errors;
    }

    function handleChange(e){
        const{ name, value}  = e.target;
        setUserData({...userData, [name]: value})
        }

    function handleSubmit(e){
        e.preventDefault();
        setFormErrors(validate(userData));
        setErrorState(true)
     }

    const handleClick = ()=>{
        setRecover(true);
    }

    useEffect(() => {
      if(Object.keys(formErrors).length === 0 && errorState){
         submitData()
      }
    }, [formErrors])


  return (
    <>
        <form autoComplete='off' onSubmit={handleSubmit}> 
                    <div className='col'>
        <TextField name='loginEmail' type="email" label="Email" value={userData.loginEmail}  onChange={handleChange} helperText={formErrors.loginEmail}   margin='normal' variant='outlined' required color='secondary'fullWidth />
        </div>
        <div className='col'>
        <TextField name='loginPassword' type="password" label="Password" value={userData.loginPassword}  onChange={handleChange} helperText={formErrors.loginPassword}   margin='normal' variant='outlined' required color='secondary'fullWidth />
        </div>
                    <div className='d-flex justify-content-end pb-2'>
                    <h6 onClick={handleClick} style={{fontSize: "13px"}}>Forgot password?</h6>
                    </div>
                    <div>
                        <Button type='submit' variant='contained' fullWidth endIcon={<LoginIcon fontSize="small" />}>Log In</Button>
                    </div>
                    </form>
    </>
  )
}

export default SignIn