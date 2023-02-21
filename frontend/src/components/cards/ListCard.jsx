import React from 'react'
import { Link } from 'react-router-dom'

function ListCard(props) {


  return (

      
          <div className="list-card-top">
            <img
              src={props.image}
              alt={props.title}
              style={{ width: "100%", height: "15em" }}
              
            />
             <div className="product-bottom text-center">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star-half-o"></i>
            <i className="fa fa-star-o"></i>
            <h3>{props.title}</h3>
            <h5>{props.price}</h5>
          </div>
            <div className="list-overlay">
            <Link to={`/product/${props.id}`}>
              <button
                type="button"
                className="btn btn-secondary"
                title="Quick Shop"
              >
                <i className="fa fa-eye"></i>
              </button>
              </Link>
              <button
                type="button"
                className="btn btn-secondary"
                title="Add to Wishlist"
              >
                <i className="fa fa-heart-o"></i>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                title="Add to Cart"
              >
                <i className="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
         
        
  )
}

export default ListCard