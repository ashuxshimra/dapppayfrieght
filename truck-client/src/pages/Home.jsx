import React, { useState } from "react";
import MakeShipRequest from "./MakeShipRequest";
import style from "../styles/HomeStyle.module.css";
import { Link } from "react-router-dom";
import ShipmentReqests from "./ShipmentReqests";

const Home = () => {
  const [activeTab, setActiveTab] = useState('makeReq')

  return (
    <div className={style.homeContainer}>
      <aside>
        <Link onClick={() =>setActiveTab('makeReq')}>Home</Link>
        <Link onClick={() =>setActiveTab('allReq')}>Shipment Requests</Link>
        <Link to="/login">Back to Login</Link>
        {/* <Link>History</Link> */}
      </aside>
      <div style={{width: '100%'}}>
        <header>
          <h1>{activeTab == 'makeReq' ? 'Book a Truck' : 'All the Requests'}</h1>
        </header>
        {activeTab == 'makeReq' ? <MakeShipRequest /> : <ShipmentReqests />}
      </div>
      
    </div>
  );
};

export default Home;
