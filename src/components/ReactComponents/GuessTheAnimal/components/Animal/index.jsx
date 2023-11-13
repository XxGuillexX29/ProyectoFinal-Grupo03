import React from "react";
import "./style.css";

function AnimalImage({ animal }) {

    return (
        <div className="animal-container">
            <h3>What animal is this?:</h3>
            <img className="animal-img" src={animal.img} alt={animal.nameEn} />
        </div>
    );
};

export default AnimalImage;