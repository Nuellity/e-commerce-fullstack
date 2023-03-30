import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clearProduct } from "../../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { userRequest } from "../../axiosRequest";

function PaymentSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [orderId, setOrderId] = useState(null);
  const order = useSelector((state) => state.order.order);
  console.log(order);
  const dispatch = useDispatch();
  dispatch(clearProduct());

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", order);
        setOrderId(res.data._id);
      } catch (error) {}
    };
    createOrder();
  }, [order]);

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
