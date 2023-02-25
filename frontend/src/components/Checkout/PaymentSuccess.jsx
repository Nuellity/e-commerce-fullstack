import React from "react";
import { useSelector } from "react-redux"

function PaymentSuccess() {
  const cart = useSelector(state => state.cart)
  console.log(cart)

  return (
    <>
    <div className="py-3">
    <div className="text-center">PaymentSuccess</div>
    <div className="container">
    <div className="row">
    <div>
      Your order has been placed
    </div>
    <div>
      Product Details: 
    </div>
    </div>
    </div>
   
    </div>
    </>
  );
}

export default PaymentSuccess;
