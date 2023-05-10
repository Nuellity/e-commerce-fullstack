import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../axiosRequest";
import { SavedCard } from "../../components/Cards/ProductCard/ProductCard";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import "./account.css";
import { useNavigate } from "react-router-dom";

const NoSavedItem = () => {
  const navigate = useNavigate();
  return (
    <div
      className="d-flex justify-content-center pt-5"
      style={{ textAlign: "center" }}
    >
      <div className="py-4">
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
          <FolderSpecialIcon
            sx={{
              fontSize: "6em",
              color: "skyblue",
            }}
          />
        </div>
        <p className="card-title pt-3 pb-2">
          You currently have no saved items.
        </p>
        <p className="card-text pb-4">
          All your saved Items will be displayed here
        </p>
        <Button
          onClick={() => navigate("/")}
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
      </div>
    </div>
  );
};

function SavedItems() {
  const user = useSelector((state) => state.user.currentUser._id);
  const [savedItems, setSavedItems] = useState([]);
  const [productList, setProductList] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteItem, setDeleteItem] = useState(null);

  const [open, setOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      const res = await userRequest.delete(`wishlists/${id}`);
      setDeleteMessage(res.data);
      setDeleteItem(id);
      setOpen(true);
    } catch (error) {}
  };
  console.log(deleteItem);

  const closeAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const savedItems = async () => {
      try {
        const res = await userRequest.get("wishlists/find/" + user);
        setSavedItems(res.data);
      } catch (error) {}
    };
    savedItems();
  }, [user, deleteItem]);

  useEffect(() => {
    const productIdArray = savedItems.map((obj) => obj.productId);
    const newArray = [...new Set(productIdArray)];
    const getProductDetails = async () => {
      const products = await Promise.all(
        newArray.map(async (productId) => {
          const response = await publicRequest.get(
            `products/find/${productId}`
          );
          return response.data;
        })
      );
      setProductList(products);
    };

    getProductDetails();
  }, [savedItems]);
  return (
    <div className="card main-card">
      <p className="card-header header">Saved Items</p>
      <div className="container">
        {productList.length === 0 ? (
          <NoSavedItem />
        ) : (
          productList.map((value, index) => {
            return (
              <SavedCard
                image={value?.img?.[0]?.original}
                key={index}
                title={value.title}
                id={value._id}
                handleDelete={handleDelete}
              />
            );
          })
        )}
        <Snackbar open={open} autoHideDuration={3000} onClose={closeAlert}>
          <Alert onClose={closeAlert} severity="error" sx={{ width: "100%" }}>
            {deleteMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default SavedItems;
