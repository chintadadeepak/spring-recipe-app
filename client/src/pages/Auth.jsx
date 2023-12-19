import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../styles/auth.css";
function Auth() {
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <div className="auth-container">
      <Register />
      <Login />
    </div>
  );
}

export default Auth;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Method called..");
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: username,
        password: password,
      });
      if (response.data === "User Does not exist")
        alert("Invalid Username..Checkout username..");
      else if (response.data === "Password is incorrect")
        alert("Invalid Password..Checkout password..");
      else {
        setCookies("access_token", response.data);
        window.localStorage.setItem("userId", response.data);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
    setUsername("");
    setPassword("");
  };
  return (
    <div className="login-form">
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        username: username,
        password: password,
      });
      if (response.data === "User Already Existed")
        alert("User Already existed..");
      alert("Congratulations, User created..");
    } catch (error) {
      console.error(error);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="register-form">
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
      />
    </div>
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-form">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>
        <label htmlFor="username">Username : </label>
        <input
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
