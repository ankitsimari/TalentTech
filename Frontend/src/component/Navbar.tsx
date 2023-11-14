import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { removeAuthCookies } from "../utils/cookie";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Store } from "../pages/Home";

export default function Navbar() {
  const isAuth = false;
  const navigate = useNavigate();
  const { user } = useSelector((store:Store) => { return store.authReducer })

  const handleLogout = () => {
    removeAuthCookies();
    navigate("/login");
  };

  return (
    <div className=" px-4 flex items-center mb-6 border-b-2 pb-2 ">
      <div className="flex">
        <h4 className="text-2xl mr-3">Interview for MERN</h4>
        <h2 className="mt-1 font-bold">|</h2>
        <p className="ms-2 text-lg">Interviewer Name</p>
      </div>
      <IoIosNotificationsOutline className="ms-auto text-3xl mr-3" />
      {/* {      <span className=' flex border border-solid border-customColor px-3 py-1 rounded-3xl mt-1 '>
        <p className='text-2xl mx-3'>username</p>
          <BiUserCircle className=' text-4xl'/>
      </span>} */}

      {user.username ? (
        <div className="flex" >
          <span className="flex border border-solid border-customColor px-3 py-1 rounded-3xl mt-1">
            <p className="text-2xl mx-3">{user.username}</p>
            <BiUserCircle className="text-4xl" />
          </span>
          <button className="border border-solid border-customColor px-3 py-1 rounded-3xl mt-1" onClick={handleLogout}>Logout</button>
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
