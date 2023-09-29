/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clearProduct } from "../../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { userRequest } from "../../utils/axiosRequest";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { clearOrder } from "../../redux/OrderSlice";
import { logout } from "../../redux/ApiCalls";

function PaymentSuccess() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentIntent = searchParams.get("payment_intent");
  const [orderId, setOrderId] = useState(null);
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();

  const isPayOnDelivery = order.paymentMethod === "Pay On Delivery";

  const updatedOrder = {
    ...order,
    paymentIntent: paymentIntent ? paymentIntent : "none",
  };

  const createOrder = async () => {
    try {
      if (
        (paymentIntent === null && isPayOnDelivery) ||
        (typeof paymentIntent === "string" && paymentIntent !== null)
      ) {
        const res = await userRequest.post("/orders", updatedOrder);
        setOrderId(res.data._id);
        dispatch(clearOrder());
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.location.reload();
      }
      if (error.response && error.response.status === 403) {
        logout(dispatch);
      }
    }
  };

  useEffect(() => {
    dispatch(clearProduct());
  }, [dispatch]);

  useEffect(() => {
    if (
      isPayOnDelivery ||
      (typeof paymentIntent === "string" && paymentIntent !== null)
    ) {
      createOrder();
    }
  }, [isPayOnDelivery, paymentIntent]);

  return (
    <>
      <Navbar />

      <div
        className=" pt-5"
        style={{ backgroundColor: "rgba(30, 40, 50, 0.05)" }}
      >
        <div className="container py-5">
          <div
            className="d-flex justify-content-center pt-5"
            style={{ textAlign: "center" }}
          >
            <div className="pb-5">
              <div
                style={{
                  background: "rgba(30, 40, 50, 0.05)",
                  padding: "1em",
                  height: "8em",
                  width: "8em",
                  borderRadius: "50%",
                  margin: "auto",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: "6em",
                    color: "green",
                  }}
                />
              </div>
              {orderId ? (
                <>
                  {" "}
                  <p className="card-title py-5">
                    Order has been created successfully. Your order number is:{" "}
                    {orderId}
                  </p>
                </>
              ) : (
                <>
                  {" "}
                  <p className="card-title py-5">
                    Payment is successfull!!! Your order is being prepared...
                  </p>
                </>
              )}
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "1rem",
                    backgroundColor: "skyblue",
                    "&:hover": {
                      backgroundColor: "#4a90e2",
                    },
                  }}
                >
                  CONTINUE SHOPPING
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
