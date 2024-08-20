import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarMenu from "./components/Navbar";
import Register from "./components/Register";
import Pools from "./components/Pools";
/*
import { useState, useEffect } from "react";
import { connect, getContract } from "./pool_circle_contract";
*/

function App() {
  /*
  const [contract, setContract] = useState(null);
  const [connected, setConnected] = useState(false);
   const [isMember, setIsMember] = useState(false);

  
  useEffect(() => {

  }, []);
  */

  return (
    <Router>
      <NavbarMenu />
      <div className="container">
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="pools" element={<Pools />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
