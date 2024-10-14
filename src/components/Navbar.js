import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add this import
import cookies from "js-cookie";
import notecontext from "../context/Notecontext";

const Navbar = () => {
  const context = useContext(notecontext);
  const { getnote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    getnote();
  }, []);
  const onchange = async (e) => {
    try {
      let response = await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/"
                  }?"active":"";`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${
                    location.pathname === "/about"
                  }?"active":"";`}
                  aria-current="page"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Link
                </Link>
              </li>
            </ul>

            {!cookies.get("token") ? (
              <>
                <Link
                  className="btn btn-primary mx-3"
                  to="/signup"
                  role="button"
                >
                  sign-up
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  log-in
                </Link>
              </>
            ) : (
              <Link
                className="btn btn-primary mx-2"
                role="button"
                onClick={onchange}
                to="/login"
              >
                log-out
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
