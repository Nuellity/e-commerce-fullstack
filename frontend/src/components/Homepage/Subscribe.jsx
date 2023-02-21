import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Subscribe() {
  return (
    <>
    <div className='sub'>
    <div className='container'>
    <div className='row subscribe'>
        <h5>Sign up to receive exclusive benefits and awesome content in your inbox</h5>

       
        <div className='col-lg-8'>

      <TextField label="Email" sx={{width: "100%"}} />
      </div>
      <div className='col-lg-4' >
      <Button variant="contained" size='large' sx={{height: "80%"}}>SUBSCRIBE</Button>
      </div>
 
      </div>  
    </div>
    </div>

    </>
  )
}

export default Subscribe