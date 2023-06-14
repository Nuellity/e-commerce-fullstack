/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TextField, Button, Box, Rating, useTheme } from "@mui/material/";
import Header from "../../components/Header";
import StarIcon from "@mui/icons-material/Star";
import { userRequest } from "../../axiosRequest";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

const labels = {
  0.5: "Useless",
  1: "Terrible",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function NewReview() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState(0);
  const [reviewInfo, setReviewInfo] = useState({
    userId: "",
    productId: "",
    title: "",
    userName: "",
    description: "",
  });
  const [hover, setHover] = useState(-1);

  const navigate = useNavigate();

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setReviewInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const review = {
    ...reviewInfo,
    rating: value,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("working");
    try {
      const res = await userRequest.post("reviews", review);
      navigate("/reviews");
      window.location.reload();
    } catch (error) {}
  };
  return (
    <div className="container">
      <Header title="Add Review" subTitle="Create a product review" />
      <form onSubmit={handleSubmit}>
        <div>
          <div className="row">
            <div className="col-md-6">
              <TextField
                fullWidth
                margin="normal"
                name="productId"
                label="Product ID"
                variant="outlined"
                value={reviewInfo.productId}
                onChange={handleFormChange}
                placeholder="Enter Product ID"
                InputLabelProps={{
                  style: { color: colors.greenAccent[400] },
                }}
                required
              />
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                margin="normal"
                name="userId"
                label="User ID"
                variant="outlined"
                value={reviewInfo.userId}
                onChange={handleFormChange}
                placeholder="Enter User ID"
                InputLabelProps={{
                  style: { color: colors.greenAccent[400] },
                }}
                required
              />
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                margin="normal"
                name="title"
                label="Review Title"
                variant="outlined"
                value={reviewInfo.title}
                onChange={handleFormChange}
                placeholder="Enter Review Title"
                InputLabelProps={{
                  style: { color: colors.greenAccent[400] },
                }}
                required
              />
            </div>
            <div className="col-md-6">
              <TextField
                fullWidth
                margin="normal"
                name="userName"
                label="Your name"
                variant="outlined"
                value={reviewInfo.userName}
                onChange={handleFormChange}
                placeholder="Enter User Name"
                InputLabelProps={{
                  style: { color: colors.greenAccent[400] },
                }}
                required
              />
            </div>
            <div className="col-md-12">
              <TextField
                multiline
                rows={8}
                fullWidth
                margin="normal"
                name="description"
                label="Detailed Review"
                placeholder="Tell us more about your rating!"
                variant="outlined"
                value={reviewInfo.decription}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: "2em",
                    },
                  }}
                >
                  <span style={{ color: colors.greenAccent[400] }}>
                    Select your rating
                  </span>
                  <Rating
                    size="large"
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={handleChange}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                  />
                </Box>
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>
            </div>
            <div className="col-md-12">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                  fontSize: "1.1em",
                  backgroundColor: colors.blueAccent[400],
                  "&:hover": {
                    backgroundColor: colors.blueAccent[600],
                  },
                }}
              >
                SUBMIT REVIEW
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewReview;
