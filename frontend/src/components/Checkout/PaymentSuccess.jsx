import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clearProduct } from "../../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { userRequest } from "../../axiosRequest";

function PaymentSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentIntent = searchParams.get("payment_intent");
  const [orderId, setOrderId] = useState(null);
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();
  dispatch(clearProduct());

  useEffect(() => {
    const updatedOrder = { ...order, paymentIntent: paymentIntent };
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", updatedOrder);
        setOrderId(res.data._id);
      } catch (error) {}
    };
    createOrder();
  }, [order, paymentIntent]);

  return (
    <>
      <div className="py-3">
        <div className="text-center">PaymentSuccess</div>
        <div className="container">
          {orderId
            ? `Order has been created successfully. Your order number is: ${orderId}`
            : `Payment successfull!! Your order is being prepared...`}
          <div>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Button variant="contained">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;
