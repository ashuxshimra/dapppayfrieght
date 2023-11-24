import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/HomeStyle.module.css";
import ShipmentReqests from "./ShipmentReqests";
const OnGoingRequests = () => {
  const [data, setData] = useState([]);
  const [driverLocationInput, setDriverLocationInput] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const getAllReqs = () => {
    axios
      .get("/api/loads/fortruck", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("tk"),
        },
      })
      .then((res) => {
        console.log(res.data.loads);
        setData(res.data.loads);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message || "Something went wrong!");
      });
  };

  const handleTakeTruck = (id) => {
    let truckNum = prompt("Please enter truck number:", "");
    if (truckNum == null || truckNum === "") {
      return;
    }

    const location = driverLocationInput.trim();
    if (location === "") {
      alert("Please enter a valid location.");
      return;
    }

    axios
      .post(
        "/api/loads/fortruck",
        {
          userId: localStorage.getItem("uid"),
          loadId: id,
          truckNum,
          location,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("tk"),
          },
        }
      )
      .then((res) => {
        const newData = data.filter((item) => item._id !== id);
        setData(newData);
        alert("Shipment accepted and location updated successfully!");
        setDriverLocationInput(""); // Clear the driver's location input field
        getAllReqs(); // Refresh the list of requests after updating the location
      })
      .catch((err) => {
        alert("Something went wrong!");
        console.log(err);
      });
  };
  useEffect(() => {
    getAllReqs();
  }, []);
  return (
      <div>
     <input
  type="text"
  placeholder="Enter driver's location"
  value={driverLocationInput}
  onChange={(e) => setDriverLocationInput(e.target.value)}
/>
<ShipmentReqests data={data} driverLocation={driverLocationInput} /> 
      
    <div className={style.cardContainer}>
      {data.length > 0 &&
        data.map((req, ind) => (
          <div className={style.card} key={ind}>
            <p>Request raised on: {req.created_date}</p>
            <p>Company Name: {req.companyName}</p>
            <p>Pickup Location: {req.pickup}</p>
            <p>Deliver to: {req.destination}</p>
            <p>Type of load: {req.loadType}</p>
            {/* <p>Total Amount: {req.price}</p> */}
            <div className={style.cardBtns}>
              <p className={style.reqStatus}>{req.status}</p>
              <button
                onClick={() => handleTakeTruck(req._id)}
                className={style.greenBtn}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
        {data.length == 0 && <div style={{marginBlock: '2.4rem', textAlign: 'center'}}>No requests available</div>}
    </div>
    </div>
  );
};

export default OnGoingRequests;




