import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setAuthCookies } from "../utils/cookie";
import { baseURL } from "../redux/store";

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const navigate = useNavigate();

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
      .post(`${baseURL}/auth/login`, payload)
      .then((res) => {
        console.log(res.data);
        const token = res.data.token;
        setAuthCookies(token);
        alert("Login Successful");
        navigate("/");
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
      .post(`${baseURL}/auth/login`, payload)
      .then((res) => {
        console.log(res.data);
        const token = res.data.token;
        setAuthCookies(token);
        alert("Guest Login Successful");
        navigate("/");
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
      .post(`${baseURL}/auth/register`, payload)
      .then((res) => {
        console.log(res.data);
        const token = res.data.token;
        setAuthCookies(token);
        alert("User Registered Successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
    setIsSignUp(true);

    setUsername("");
    setEmail("");
    setPass("");
  };

  return (
    <DIV>
      <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpClick} className="text-center">
            <h1 className="font-bold text-xl m-0">Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-eee border border-solid border-gray-300 px-4 py-3 my-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-eee border border-solid border-gray-300 px-4 py-3 my-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              className="bg-eee border border-solid border-gray-300 px-4 py-3 my-2 w-full"
            />
            <button type="submit" className="border-2 border-solid border-purple-600 bg-purple-600 text-white text-sm font-bold uppercase py-3 px-10 rounded-full transition-transform duration-80 ease-in focus:outline-none active:scale-95">
              Sign Up
            </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInClick} className="text-center">
            <h1 className="font-bold m-0 text-xl">Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-eee border border-solid border-gray-300 px-4 py-3 my-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-eee border border-solid border-gray-300 px-4 py-3 my-2 w-full"
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="submit" className="border-2 border-solid border-purple-600 bg-purple-600 text-white text-sm font-bold uppercase py-3 px-10 rounded-full transition-transform duration-80 ease-in focus:outline-none active:scale-95">
              Sign In
            </button>
            <br />
            <button onClick={handleGuestSignInClick} className="border-2 border-solid border-purple-600 bg-purple-600 text-white text-sm font-bold uppercase py-3 px-10 rounded-full transition-transform duration-80 ease-in focus:outline-none active:scale-95">
              Guest Login
            </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold m-0 text-xl">Welcome Back!</h1>
              <p className="text-base font-light leading-5 tracking-wider my-5">
                To keep connected with us please login with your personal info
              </p>
              <button className="border-2 border-solid border-white bg-purple-600 text-white text-sm font-bold uppercase py-3 px-10 rounded-full transition-transform duration-80 ease-in focus:outline-none active:scale-95" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold m-0 text-xl">Hello, Explorer!</h1>
              <p className="text-base font-light leading-5 tracking-wider my-5">Enter your personal details and start the journey with us</p>
              <button className="border-2 border-solid border-white bg-purple-600 text-white text-sm font-bold uppercase py-3 px-10 rounded-full transition-transform duration-80 ease-in focus:outline-none active:scale-95" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  * {
    box-sizing: border-box;
    /* margin: auto */
  }

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
  }

  .container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: #7a3ff3;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .overlay-left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay-right {
    transform: translateX(20%);
  }

  .button1 {
    background-color: #7a3ff3;
    color: white;
  }
`;