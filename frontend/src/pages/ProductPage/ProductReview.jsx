import React from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from "@mui/material";
import moment from "moment";

const styles = {
  listItem: {
    marginBottom: "16px",
    border: "1px solid rgba(0, 0, 0, 0.5)",
    borderRadius: "4px",
    padding: "16px",
  },
  listItemText: {
    marginBottom: "8px",
  },
  date: {
    marginLeft: "8px",
  },
  imageGallery: {
    width: "100%",
    height: "20em",
  },
};

function ProductReview({ averageRating, reviews, image }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Average Rating: {averageRating.toFixed(1)}
        <br />
        <span> {reviews.length} reviews</span>
        <Box
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: "2em",
            },
          }}
        >
          <Rating
            precision={0.1}
            value={parseFloat(averageRating.toFixed(1))}
            readOnly
          />
        </Box>
      </Typography>
      <div style={{ overflowY: "auto", height: "16em" }}>
        <List>
          {reviews.map((review, index) => (
            <ListItem key={index} style={styles.listItem}>
              <ListItemAvatar>
                <Avatar src={image[0]?.original} />
              </ListItemAvatar>
              <ListItemText
                variant="span"
                primary={review.title}
                secondary={
                  <>
                    <Typography variant="span" style={styles.listItemText}>
                      {review.description}
                    </Typography>
                    <Box component="span" display="flex" alignItems="center">
                      <Rating
                        precision={0.2}
                        value={parseFloat(review.rating)}
                        readOnly
                      />
                      <Typography variant="span" color="textSecondary">
                        ({review.rating})
                      </Typography>
                      <Typography
                        variant="span"
                        color="textSecondary"
                        style={styles.date}
                      >
                        {"  "}
                        {moment(review.createdAt).format("dddd MMMM, YYYY")}
                      </Typography>
                    </Box>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

export default ProductReview;
