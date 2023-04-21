import React from "react";
import { SavedCard } from "../../components/Cards/ProductCard/ProductCard";
import "./account.css";

function SavedItems() {
  return (
    <div className="card main-card">
      <p className="card-header header">Saved Items</p>
      <div className="container">
        <SavedCard />
      </div>
    </div>
  );
}

export default SavedItems;
