import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";

function Stripe() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientKey, setClientKey] = useState("");

  useEffect(() => {
    const fetchPublicKey = async (result) => {
      try {
        const res = await axios.get(
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
        const res = await axios.post(
          "http://localhost:4000/api/checkout/payment",
          {
            method: "POST",
            body: JSON.stringify({}),
          }
        );
        const clientSecret = res.data.clientSecret;
        setClientKey(clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientKey();
  }, []);

  const options = {
    clientSecret: `${clientKey}`,
  };

  return (
    <>
      <h2>Stripe Checkout</h2>
      {stripePromise && clientKey && (
        <Elements stripe={stripePromise} options={options}>
          <StripeForm />
        </Elements>
      )}
    </>
  );
}

export default Stripe;
