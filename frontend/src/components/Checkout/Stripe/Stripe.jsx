/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../../axiosRequest";
 

function Stripe(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientKey, setClientKey] = useState("");



  const cart = useSelector(state => state.cart)
  const price = cart.total.toFixed(2)


  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const res = await publicRequest.get(
          "http://localhost:4000/api/checkout/config"
        );
        const stripeKey = res.data.stripePublishKey;
        setStripePromise(loadStripe(stripeKey));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPublicKey();
  }, []);

  useEffect(() => {
    const fetchClientKey = async () => {
      try {
        const res = await userRequest.post(
          "http://localhost:4000/api/checkout/payment",
          {
            method: "POST",
            amount: price,
            body: JSON.stringify({}),
          }
        );
        const clientSecret = res.data.clientSecret;
        setClientKey(clientSecret);
          
      } catch (error) {
        console.log(error.response.data.error.message);
      }
    };
    fetchClientKey();
  }, []);

  const options = {
    clientSecret: `${clientKey}`,
  };

  return (
    <>
      {stripePromise && clientKey && (
        <Elements stripe={stripePromise} options={options}>
          <StripeForm price={price} orderId={props.orderId} />
        </Elements>
      )}
    </>
  );
}

export default Stripe;
