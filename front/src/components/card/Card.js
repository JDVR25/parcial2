import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

export const Card = (props) => {
  console.log(props)
  return ( 
    <div className="card card-home">
      <Link className="card-home-img-link" to={`/homes/${props.id}`}>
        {props.type === "house" ? (
          <img src="/home.png" className="card-home-img-top" alt="Icon Home" />
        ) : (
          <img
            src="/loft.png"
            className="card-home-img-top loft"
            alt="Icon Loft"
          />
        )}
      </Link>
      <div className="card-home-body">
        <div className="card-home-body-description">
          <h5 className="card-home-title">{props.name}</h5>
          <p className="card-home-text">{props.address}</p>
        </div>
      </div>
    </div>
  );
};
