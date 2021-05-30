import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

export const Card = (props) => {
    console.log(props)
    return (
            <div className="card card-home">
                <div className="card-home-body">
                    <div className="card-home-body-description">
                        <h6 className="card-home-title">{props.name}</h6>
                    </div>
                </div>
                <div className="card-home-img-link">
                    {props.type === "kitcken" ? (
                        <img src="/kitchen.png" className="card-home-img-top" alt="Icon kitchen" onClick={()=>props.setDevices(props.devices)}/>
                    ) : (
                        <img
                            src="/living-room.png"
                            className="card-home-img-top"
                            alt="Icon room"
                            onClick={()=>props.setDevices(props.devices)}
                        />
                    )}
                </div>
            </div>

    );
};