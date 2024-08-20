import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarMenu from "./components/Navbar";
import Register from "./components/Register";
import Pools from "./components/Pools";

function App() {
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
