import { NavLink, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Pedidos from "./Pedidos";
import Movimientos from "./Movimientos";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark bg-primary d-flex justify-content-center">
          <h2>
            <NavLink to="/" className="text-white mx-3">
              Pedidos
            </NavLink>
          </h2>
          <h2>
            <NavLink to="/movimientos" className="text-white mx-3">
              Movimientos
            </NavLink>
          </h2>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Pedidos />} /> {/* Página principal */}
            <Route path="/movimientos" element={<Movimientos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
