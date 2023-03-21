import React from "react";
import { Link, useLocation} from "react-router-dom";
import { clearProduct } from "../../redux/CartSlice"
import { useDispatch } from 'react-redux';
import { Button } from "@mui/material";



function PaymentSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderId');
  const dispatch = useDispatch()
  dispatch(clearProduct())


  return (
    <>
    <div className="py-3">
    <div className="text-center">PaymentSuccess</div>
    <div className="container">
    { orderId ? `Order has been created successfully. Your order number is: ${orderId}` :  `Payment successfull!! Your order is being prepared...`}
    <div>
    <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
      <Button variant="contained">Continue Shopping</Button>
      </Link>
    </div>
    </div>
   
    </div>
    </>
  );
}

export default PaymentSuccess;
