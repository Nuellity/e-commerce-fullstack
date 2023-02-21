import React from 'react'

function ImageOverlayCard(props) {
  return (
    <>
    <div className="col-lg-3 col-md-6 col-sm-6 col-6">
      <div className="collection-container">
      
      <a href='/test'>
      <img src={props.image} alt={props.title} className="collection-image img-fluid" />
      <div className="overlay">{props.title}</div>
      </a>
    </div>
    </div>
    </>
  )
}

export default ImageOverlayCard