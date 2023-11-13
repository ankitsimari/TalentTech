import React, { useState } from "react";
import axios from "axios";
import "../Login.css";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleSignUp = () => {
    setIsSignUp(true);
  };

  const handleSignIn = () => {
    setIsSignUp(false);
  };

  const handleSignInClick = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, password };

    console.log("login-payload", payload);

    axios
      .post("http://localhost:3000/auth/login", payload)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        alert("Login Successful");
        navigate("/")
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPass("");
  };

  const handleGuestSignInClick = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email: "guest@gmail.com", password: "guest123" };

    console.log("login-payload", payload);

    axios
      .post("http://localhost:3000/auth/login", payload)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        alert("Guest Login Successful");
        navigate("/")
      })
      .catch((err) => console.log(err));

    setEmail("");
    setPass("");
  };

  const handleSignUpClick = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username,
      email,
      password,
    };

    console.log("signup-payload", payload);

    axios
      .post("http://localhost:3000/auth/register", payload)
      .then((res) => {
        console.log(res.data);
        alert("User Registered Successfully");
        navigate("/")
      })
      .catch((err) => console.log(err));
    setIsSignUp(true);

    setUsername("");
    setEmail("");
    setPass("");
  };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUpClick} className="text-center">
          <h1>Create Account</h1>
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="button1">
            Sign Up
          </button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form onSubmit={handleSignInClick} className="text-center">
          <h1>Sign in</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
          />
          <button type="submit" className="button1">
            Sign In
          </button>
          <br />
          <button onClick={handleGuestSignInClick} className="button1">
            Continue as a guest
          </button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Explorer!</h1>
            <p>Enter your personal details and start the journey with us</p>
            <button className="ghost" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



