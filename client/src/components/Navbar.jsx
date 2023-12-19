import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/navbar.css";
function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logOut = () => {
    alert("User logged out..");
    setCookies("access_token", null);
    window.localStorage.removeItem("userId");
    navigate("/auth");
  };
  return (
    <div className="navbar-container">
      <Link className="navbar-link" to="/">
        Home
      </Link>
      {cookies.access_token ? (
        <>
          <Link className="navbar-link" to="/create-recipe">
            Create Recipe
          </Link>
          <Link className="navbar-link" to="/saved-recipes">
            Saved Recipes
          </Link>
          <button className="navbar-button" onClick={logOut}>
            logout
          </button>
        </>
      ) : (
        <Link className="navbar-link" to="/auth">
          Auth
        </Link>
      )}
    </div>
  );
}

export default Navbar;
