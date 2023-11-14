import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { removeAuthCookies } from "../utils/cookie";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Store } from "../pages/Home";
import profile from "../assets/profile.png";
import { toast } from "react-toastify";

export default function Navbar() {
  const isAuth = false;
  const navigate = useNavigate();
  const { user } = useSelector((store: Store) => {
    return store.authReducer;
  });

  const handleLogout = () => {
    toast.success("Logout Successful")
    removeAuthCookies();
    navigate("/login");
  };

  return (
    <div className=" px-4 flex items-center justify-between mb-6 border-b-2 border-gray-300 pb-2 ">
      <h1 className="text-2xl	font-medium	">
        Welcome, <span className=" text-3xl font-semibold text-purple-700">{user.username}</span>
      </h1>
      {/* {      <span className=' flex border border-solid border-customColor px-3 py-1 rounded-3xl mt-1 '>
        <p className='text-2xl mx-3'>username</p>
          <BiUserCircle className=' text-4xl'/>
      </span>} */}

      {user.username ? (
        <div className="flex items-center">
          <div className="flex  px-3 py-1 rounded-3xl">
            <img src={profile} alt="" className="w-9 h-9 cursor-pointer" />
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90  focus:outline-none focus:ring-[#24292F]/50 font-small rounded-md text-sm px-4 py-1.5 text-center inline-flex items-center dark:hover:bg-[#050708]/30 me-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="ms-auto">
          <Link to="/login" className="text-2xl mx-3">
            Login
          </Link>
          {/* <Link to="/signup" className='text-2xl mx-3'>Sign Up</Link> */}
        </div>
      )}
    </div>
  );
}
