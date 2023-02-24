import React, { useState } from 'react'
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import LoadingButton from '@mui/lab/LoadingButton';

import { Button } from '@mui/material';

function StripeForm(props) {
    const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/paymentsuccess`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };




  return (
    <>
    <div className='container'>
        <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <div className='pt-3'>
      {isProcessing ? <LoadingButton loading  variant="contained">
        Processing...
      </LoadingButton> : <Button color="success" variant='contained' disabled={isProcessing || !stripe || !elements} type="submit">
      
      {`Pay $${props.price}`}
   
  </Button> }

       {/* <Button color="success" variant='contained' disabled={isProcessing || !stripe || !elements} type="submit">
      
          {isProcessing ? "Processing ... " : `Pay $${props.price}`}
       
      </Button> */}
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
 
    
     
    </div>
    </>
  )
}

export default StripeForm