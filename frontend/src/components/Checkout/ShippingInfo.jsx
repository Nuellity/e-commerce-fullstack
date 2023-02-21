/* eslint-disable react-hooks/exhaustive-deps */

import { Button, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { multiStepDetails } from './StepDetails'


function ShippingInfo() {
    const {setCurrentStep, userData, setUserData} = useContext(multiStepDetails)
    const [formErrors, setFormErrors] = useState({})
    const [errorState, setErrorState] = useState(false);

    
    const validate = (data) =>{
        const errors = {}
        if(!data.address){
            errors.address= "Address is required";
        }
        if(!data.city){
            errors.city= "City is required";
        }
        if(!data.country){
            errors.country= "Country is required";
        }
        if(!data.state){
            errors.state= "State is required";
        }
        if(!data.postalCode){
            errors.postalCode= "Address is required";
        }
        return errors;
    }
    
    function handleNext(e){
        e.preventDefault();
        setFormErrors(validate(userData));
        setErrorState(true)
     }
    

    function handleChange(e){
    const{ name, value}  = e.target;
    setUserData({...userData, [name]: value})
    }

    useEffect(() => {
      if(Object.keys(formErrors).length === 0 && errorState){
         setCurrentStep(3)
      }
    }, [formErrors])
    
    


    
    return (
    
   
    
        <form autoComplete='off'  onSubmit={handleNext}>
        <div className='row'>
        <div className='col-lg-12'>
        <TextField name='address' label="Address" value={userData.address}  onChange={handleChange}  margin='normal' variant='outlined' color='secondary'  required  fullWidth/>
        </div>
        <div className='col-lg-6 col-6'>
        <TextField name='city' label="City" value={userData.city} onChange={handleChange} margin='normal' variant='outlined' color='secondary'  required  fullWidth/>
        </div>
        <div className='col-lg-6 col-6'>
        <TextField name='state' label="State" value={userData.state} onChange={handleChange}  margin='normal' variant='outlined' color='secondary'  required  fullWidth/>
        </div>
        <div className='col-lg-6 col-6'>
        <TextField name='country' label="Country" value={userData.country} onChange={handleChange}  margin='normal' variant='outlined' color='secondary'  required  fullWidth/>
        </div>
        <div className='col-lg-6 col-6'>
        <TextField name='postalCode' label="Postal Code" value={userData.postalCode} onChange={handleChange}  margin='normal' variant='outlined' color='secondary'  required  fullWidth/>
        </div>
        
        <div className='d-flex pt-3 justify-content-between'>
            <Button variant='contained' onClick={()=>setCurrentStep(1)} >BACK</Button>
            <Button type='submit' variant="contained">NEXT</Button>
        </div>
        </div>
        </form>
    
    
    
  )
}

export default ShippingInfo