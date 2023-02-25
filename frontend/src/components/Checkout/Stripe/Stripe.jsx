/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../../axiosRequest";

function Stripe() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientKey, setClientKey] = useState("");
  console.log(clientKey)

  const price = useSelector(state => state.cart.total)


  useEffect(() => {
    const fetchPublicKey = async (result) => {
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
    const fetchClientKey = async (result) => {
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
          <StripeForm price={price} />
        </Elements>
      )}
    </>
  );
}

export default Stripe;
