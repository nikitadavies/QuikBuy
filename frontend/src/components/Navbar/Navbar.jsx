import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage?.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getRole = () => {
    const storedRole = localStorage.getItem("token");
    if (!storedRole) {
      navigate("/login");
    } else {
      setRole(storedRole);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand-link">
          QuikBuy
        </Link>
      </div>
      <div className="navbar-links">
      <p>
            <button
              style={{backgroundColor: "white", borderRadius: "8px", paddingLeft: "15px", paddingRight: "15px", paddingTop: '5px', paddingBottom: '5px'}}
              onClick={() => navigate("/login")}
            >
              {localStorage.getItem("token") ? "Logout" : "Login"}
            </button>
          </p>
          <p>
            {/* <button
              style={{backgroundColor: "white", borderRadius: "8px", paddingLeft: "15px", paddingRight: "15px", paddingTop: '5px', paddingBottom: '5px'}}
              onClick={() => navigate("/create-store")}
            >
              Create Store
            </button> */}
          </p>
      </div>
    
    </nav>
  );
};

export default NavBar;