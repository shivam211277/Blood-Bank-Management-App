import React from "react";
import { BiDonateBlood } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  //logout handler
  const handleLogout = () => {
    localStorage.clear();
    // alert("Logged out Successfully");

    window.location.replace("/login");
    toast.success("logged out");
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-brand h1">
          <BiDonateBlood color="red" />
          Blood Bank App
        </div>
        <ul className="navbar-nav flex-row">
          <li className="nav-item mx-3">
            <p className="nav-link  ">
              <FaUserCircle style={{ marginRight: "10px" }} />
              Welcome{" "}
              {user?.name || user?.hospitalName || user?.organisationName}{" "}
              &nbsp;
              <span className="badge text-bg-secondary">{user?.role}</span>
            </p>
          </li>

          {location.pathname === "/" ||
          location.pathname === "/donar" ||
          location.pathname === "/hospital" ? (
            <li className="nav-item mx-3">
              <Link to="/analytics" className="nav-link  ">
                Analytics
              </Link>
            </li>
          ) : (
            <li className="nav-item mx-3">
              <Link to="/" className="nav-link  ">
                Home
              </Link>
            </li>
          )}

          <li className="nav-item mx-3 ">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
