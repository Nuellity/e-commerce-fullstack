import React from "react";
import { Box, useTheme, Typography, Avatar, Button } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import { updateOrder } from "../../redux/ApiCalls";

function SingleOrder() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderId = location.pathname.split("/")[2];
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );

  const handleClick = () => {
    updateOrder(orderId, { status: "completed" }, dispatch);
    navigate("/transactions");
    window.location.reload();
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.blueAccent[400],
    "&:hover": {
      backgroundColor: colors.blueAccent[600],
    },
  }));

  return (
    <>
      <Box m="20px">
        <Header title="Manage your orders" subTitle="View order details" />
        <div className="row">
          <div className="col-lg-6">
            <Box
              backgroundColor={colors.primary[400]}
              component="div"
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "10px",
                height: "100%",
              }}
            >
              <div>
                <Typography variant="h3" color={colors.greenAccent[400]}>
                  ORDERED PRODUCTS
                </Typography>
                {order &&
                  order.products &&
                  order.products.map((value, id) => (
                    <Box
                      key={id}
                      component="div"
                      sx={{
                        padding: "5px",
                        width: "100%",
                        margin: "15px 20px",
                      }}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Box>
                          <Avatar
                            src={value.img}
                            alt={value.name}
                            sx={{ width: 120, height: 120 }}
                          />
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{
                              color: colors.grey[100],
                              margin: "1em 0.5em",
                            }}
                          >
                            {value.name}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        mt="2px"
                      >
                        <Typography
                          variant="h5"
                          fontStyle="italic"
                          sx={{ color: colors.greenAccent[600] }}
                        >
                          Quantity ordered: {value.quantity}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
              </div>
            </Box>
          </div>
          <div className="col-lg-6">
            <Box
              backgroundColor={colors.primary[400]}
              component="div"
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                padding: "10px",
                height: "100%",
              }}
            >
              <Typography variant="h3" color={colors.greenAccent[400]}>
                ORDER PRICE: ${order?.amount}
              </Typography>
              <div className="pt-4">
                <Typography variant="h5" color={colors.greenAccent[200]}>
                  Payment Method: {order?.paymentMethod}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[200]}>
                  {order?.paymentMethod === "Credit/Debit Cards" &&
                    `Payment ID: ${order?.paymentIntent}`}
                </Typography>
              </div>

              <div>
                <div className="mt-4 mb-2">
                  <Typography variant="h4" color={colors.blueAccent[400]}>
                    Delivery details
                  </Typography>
                </div>
                <Typography variant="h5" color={colors.grey[200]}>
                  <span
                    style={{ marginRight: "5px", color: colors.redAccent[500] }}
                  >
                    Address:
                  </span>{" "}
                  {order && order.address.address}
                </Typography>
                <Typography color={colors.grey[200]} variant="h5">
                  <span
                    style={{ marginRight: "5px", color: colors.redAccent[500] }}
                  >
                    City:
                  </span>{" "}
                  {order && order.address.city}
                </Typography>
                <Typography color={colors.grey[200]} variant="h5">
                  <span
                    style={{ marginRight: "5px", color: colors.redAccent[500] }}
                  >
                    State:
                  </span>{" "}
                  {order && order.address.state}
                </Typography>
                <Typography color={colors.grey[200]} variant="h5">
                  <span
                    style={{ marginRight: "5px", color: colors.redAccent[500] }}
                  >
                    Country:
                  </span>{" "}
                  {order && order.address.country}
                </Typography>
                <Typography color={colors.grey[200]} variant="h5">
                  <span
                    style={{ marginRight: "5px", color: colors.redAccent[500] }}
                  >
                    Postal Code:
                  </span>{" "}
                  {order && order.address.postalCode}
                </Typography>
              </div>
            </Box>
          </div>
          <div className="my-3">
            <ColorButton
              disabled={order && order.status === "completed"}
              onClick={handleClick}
              style={{ width: "200px", height: "40px", fontSize: "15px" }}
            >
              {order && order.status === "completed"
                ? "Order Completed"
                : "Complete Order"}
            </ColorButton>
          </div>
        </div>
      </Box>
    </>
  );
}

export default SingleOrder;
