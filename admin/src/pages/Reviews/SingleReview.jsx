import React from "react";
import {
  Box,
  useTheme,
  Typography,
  Avatar,
  Button,
  Rating,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { styled } from "@mui/material/styles";
import { updateReview } from "../../redux/ApiCalls";

function SingleReview() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviewId = location.pathname.split("/")[2];
  const review = useSelector((state) =>
    state.review.reviews.find((review) => review._id === reviewId)
  );
  const productId = review.productId;
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const handleClick = () => {
    updateReview(reviewId, { status: "completed" }, dispatch);
    navigate("/reviews");
    window.location.reload();
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(colors.grey[100]),
    backgroundColor: colors.blueAccent[400],
    "&:hover": {
      backgroundColor: colors.blueAccent[600],
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "8rem",
      height: "2.5rem",
      fontSize: "0.7rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "12.5rem",
      height: "2.5rem",
      fontSize: "1rem",
    },
  }));

  return (
    <div className="container">
      <Header title="Manage your reviews" subTitle="View review details" />
      <div className="row g-4">
        <div className="col-lg-6 ">
          <Box
            backgroundColor={colors.primary[400]}
            component="div"
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              padding: "10px",
              height: "100%",
            }}
          >
            <Avatar
              src={product?.img[0]?.original}
              alt={product?.title}
              sx={{
                width: 180,
                height: 180,
                marginBottom: "10px",
              }}
            />
            <Typography variant="h3" color={colors.greenAccent[400]}>
              {product?.title}
            </Typography>
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
            <div>
              <Typography variant="h5" color={colors.blueAccent[400]}>
                <span
                  style={{ marginRight: "5px", color: colors.redAccent[500] }}
                >
                  Username:
                </span>{" "}
                {review?.userName}
              </Typography>
              <Typography variant="h5" color={colors.blueAccent[400]}>
                <span
                  style={{ marginRight: "5px", color: colors.redAccent[500] }}
                >
                  Title:
                </span>{" "}
                {review?.title}
              </Typography>
              <Typography variant="h5" color={colors.blueAccent[400]}>
                <span
                  style={{ marginRight: "5px", color: colors.redAccent[500] }}
                >
                  Review Details:
                </span>{" "}
                {review?.description}
              </Typography>
              <Typography variant="h5" color={colors.blueAccent[400]}>
                <span
                  style={{ marginRight: "5px", color: colors.redAccent[500] }}
                >
                  Status:
                </span>{" "}
                {review?.status}
              </Typography>
              <Rating
                name="review-rating"
                value={review?.rating}
                precision={0.2}
                readOnly
                size="large"
              />
            </div>
          </Box>
        </div>
        <div className="my-3">
          <ColorButton
            disabled={review?.status === "completed"}
            onClick={handleClick}
          >
            {review?.status === "completed"
              ? "Review Published"
              : "Publish Review"}
          </ColorButton>
        </div>
      </div>
    </div>
  );
}

export default SingleReview;
