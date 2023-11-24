import React from 'react'
import style from "../styles/HomeStyle.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MakeShipRequest = () => {
    const navigate = useNavigate();
  const handleLoadAdd = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    axios
      .post("/api/loads", formObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("tk"),
        },
      })
      .then((res) => {
        alert("Load has been created!");
        event.target.reset();
        
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message || "Something went wrong!");
      });
  };
  return (
    <main className={style.mainContainer}>
       
        <div className={style.form_shipper}>
          <form onSubmit={handleLoadAdd}>
            <label htmlFor="name">Your Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required />

            <label htmlFor="companyName">Company Name(optional):</label>
            <input type="text" id="companyName" name="companyName" />

            <label htmlFor="pickup">Pickup Location:</label>
            <input type="text" id="pickup" name="pickup" required />

            <label htmlFor="destination">Destination:</label>
            <input type="text" id="destination" name="destination" required />

            <label htmlFor="loadType">Load Type:</label>
            <input type="text" id="loadType" name="loadType" required />

            <label htmlFor="weight">Total Weight:</label>
            <input type="text" id="weight" name="weight" required />

            <label htmlFor="price">Total Price (Rs.) :</label>
            <input type="text" id="price" name="price" required />

            <label htmlFor="date">Date of Shipment:</label>
            <input type="date" id="date" name="date" required />

            <label htmlFor="delieverTill">Deliever Till:</label>
            <input type="date" id="delieverTill" name="delieverTill" required />
            <button className={style.submitBtn} id="submitBtn" type="submit">
              Request Driver
            </button>
          </form>
        </div>
      </main>
  )
}

export default MakeShipRequest