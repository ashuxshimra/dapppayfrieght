import Auth from "./Global/Auth";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShipmentReqests from "./pages/ShipmentReqests";
import Driver from "./pages/Driver";
import ReduxToastr from 'react-redux-toastr';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth><Home /></Auth>}></Route>
          <Route path="/home" element={<Auth><Home /></Auth>}></Route>
          <Route path="/driver" element={<Auth><Driver /></Auth>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
