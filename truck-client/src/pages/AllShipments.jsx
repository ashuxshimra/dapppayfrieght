import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../styles/HomeStyle.module.css";

const AllShipments = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/loads/assignedTruck/" + localStorage.getItem("uid"), {
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
  }, []);
  return (
    <div className={style.cardContainer}>
      {data.length > 0 &&
        data.map((req, ind) => (
          <div className={style.card} key={ind}>
            <p>Request raised on: {req.created_date}</p>
            <p>Company Name: {req.companyName}</p>
            <p>Pickup Location: {req.pickup}</p>
            <p>Deliever to: {req.destination}</p>
            <p>Type of load: {req.loadType}</p>
            <div
              className={style.cardBtns}
              style={{ display: 'flex', alignItems: "center" }}
            >
              <p>Assigned to: </p>
              <p className={style.reqStatus}>{req.truckNum}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllShipments;
