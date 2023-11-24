  import axios from 'axios';
  import React, { useEffect, useState } from 'react'
  import style from '../styles/HomeStyle.module.css'
  import Web3 from 'web3';
  import { toastr } from 'react-redux-toastr';
  import Toastify from 'toastify-js'; 
import OnGoingRequests from './OnGoingReq';
  const ShipmentReqests = ({driverLocation}) => {
      const [data, setData] = useState([])
      const getAllReqs = () => {
          axios
            .get("/api/loads", {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("tk"),
              },
            })
            .then((res) => {
              console.log(res.data.loads)
              setData(res.data.loads)
            })
            .catch((err) => {
              console.log(err);
              alert(err.response.data.message || "Something went wrong!");
            });
        };

        const handleRevoke = (id) => {
          // console.log(id);
          axios
            .delete("/api/loads/"+id, {
              headers: {  
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("tk"),
              },
            })
            .then((res) => {
              const newData = data.filter(res => res._id != id)
              setData(newData)
              alert("Successfully revoke the request")
            })
            .catch((err) => {
              console.log(err);
              alert(err.response.data.message || "Something went wrong!");
            });
        }

        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545"); // Use the appropriate provider URL
        const contractAddress = '0x32eEfEa8b5d8f928d50d32e1D1e51a6B684e9Fb5';
        const contractABI = [
          {
            "inputs": [],
            "name": "pay",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "PaymentReceived",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "balances",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const handlePay = async (id) => {
          
          try {
            // Get the selected request by id from your data array
            // const selectedRequest = data.find(req => req._id === id);
        
        
            // Check if Web3 is connected
            if (web3.currentProvider) {
              // Get the user's Ethereum accounts
              const accounts = await web3.eth.getAccounts();
        
              // Send a transaction to the pay function on the smart contract
              await contract.methods.pay().send({
                from: accounts[0], // Use the first account as the sender
                value: web3.utils.toWei('1', 'ether'), // Convert advanceAmount to Wei
              });
        
              // Handle the payment success
              // You can update the UI, show a success message, etc.
              // showAlert("Payment successful. Transaction Hash: ");
              console.log('Payment successful');
              // toastr.success('Payment Successful', 'Your One Time payment was successful!');
              alert('Payment successful! Your one-time payment was successful. Item will be delivered on time!');

            } else {
              console.error('Web3 provider not detected');
              // toastr.error('Payment Failed', 'There was an error processing your payment.');
              alert('Payment failed: Web3 provider not detected');
            }
          } catch (error) {
            // Handle errors, show error messages, etc.
            console.error('Payment failed:', error);
          }
          const updatedData = data.map((req) => {
            if (req._id === id) {
              return { ...req, paid: true };
            }
            return req;
          });
      
          setData(updatedData);
        // };
        };
        
        function showErrorToast(message) {
          Toastify({
            text: message,
            duration: 5000,
            close: true,
            gravity: "top", // You can change the toast position as needed
            backgroundColor: "red",
          }).showToast();
        }
        function showSuccessToast(message) {
          Toastify({  
            text: message,
            duration: 5000,
            close: true,
            gravity: "top", // You can change the toast position as needed
            backgroundColor: "green",
          }).showToast();
        }
        
        // const handlePay = (id) => {
        //   // handle payment
        // }

        useEffect(() => {
          getAllReqs()
        }, [])
    return (
      <div className={style.cardContainer}>
          {data.length>0 && data.map((req, ind) => (
              <div className={style.card} key={ind}>
                  <p>Request raised on: {req.created_date}</p>
                  <p>Company Name: {req.companyName}</p>
                  <p>Pickup Location: {req.pickup}</p>
                  <p>Deliever to: {req.destination}</p>
                  <p>Type of load: {req.loadType}</p>
                  <div className={style.cardBtns} style={{display: "flex", alignItems:'center'}}>
                      <p className={style.reqStatus}>{req.status}</p>
                      {req.status=='ASSIGNED' ? 
                        <div>
                          <p>Assigned to: {req.truckNum}</p>
                          <button className={style.payBtn} onClick={() => handlePay(req._id)} disabled={req.paid}>
                    {req.paid ? 'Paid Already' : 'Pay Advance'}
                  </button>                        </div>
                      : <button onClick={() => handleRevoke(req._id)} className={style.deleteReq}>Revoke</button>}
                  </div>
              </div>
          ))}
      </div>
    )
  }

  export default ShipmentReqests