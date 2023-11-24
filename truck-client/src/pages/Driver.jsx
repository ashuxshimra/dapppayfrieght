import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from "../styles/HomeStyle.module.css";
import OnGoingRequests from './OnGoingReq';
import AllShipments from './AllShipments';


const Driver = () => {
    const [activeTab, setActiveTab] = useState('ongoingreq')
  return (
    <div className={style.homeContainer}>
      <aside>
        <Link onClick={() =>setActiveTab('ongoingreq')}>Home</Link>
        <Link onClick={() =>setActiveTab('allShips')}>All Shipments</Link>
        <Link to="/login">Back to Login</Link>
        {/* <Link>History</Link> */}
      </aside>
      <div style={{width: '100%'}}>
        <header>
          <h1>{activeTab == 'ongoingreq' ? 'On going requests' : 'All the Requests'}</h1>
        </header>
        {activeTab == 'ongoingreq' ? <OnGoingRequests /> : <AllShipments />}
      </div>
    </div>
  )
}

export default Driver