import React from "react";
import { ReviewCard } from "../../../components/Cards/ProductCard/ProductCard";
import "../account.css";

function Reviews() {
  return (
    <div className="card main-card">
      <p className="card-header header">Pending Reviews</p>
      <div className="container">
        <ReviewCard />
      </div>
    </div>
  );
}

export default Reviews;
