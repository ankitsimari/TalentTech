import React, { useState } from "react";
import {
  AiFillSetting,
  AiOutlineSetting,
  AiOutlineLeftCircle,
  AiOutlineRightCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FaCaretSquareRight } from "react-icons/fa";
import { FaCaretSquareLeft } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineFeedback, MdInsights } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { LuMonitorSmartphone } from "react-icons/lu";
import { BsMedium, BsChatLeftDots } from "react-icons/bs";
import { NavLink, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Analytics from "../pages/Analytics";
import Faq from "../pages/Faq";
import SpeechToText from "./Interview/SpeechToText";
import { Login } from "../pages/Login";
import Interview from "../pages/Interview";
import LandingPage from "../pages/LandingPage";
import Logo from "../assets/Logo.png"
import { ToastContainer } from "react-toastify";

interface MenuItem {
  path: string;
  name: string;
  icon: JSX.Element;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const location = useLocation();
  console.log(location.pathname);

  const menuItem: MenuItem[] = [
    {
      path: "/",
      name: "Home",
      icon: <IoHomeOutline />,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      path: "/interview",
      name: "Interview",
      icon: <LuMonitorSmartphone />,
    },
    {
      path: "/insight",
      name: "Insight",
      icon: <MdInsights />,
    },
    {
      path: "/faq",
      name: "FAQ",
      icon: <AiOutlineQuestionCircle />,
    },
  ];

  return (
    <div className="flex">
      <div
        style={{ width: isOpen ? "250px" : "50px" }}
        className=" h-screen bg-black text-white transition-all duration-500 sticky top-0 "
      >
        <div className=" px-4 py-5 flex items-center mb-6">
          <span style={{ display: isOpen ? "block" : "none" }}>
            <div className="flex">
              <img src={Logo} alt="" />
            </div>
          </span>

          <div
            style={{ marginLeft: isOpen ? "16px" : "0px" }}
            className="mt-2 flex text-2xl"
          >
            {/* <FaBars onClick={toggle} /> */}
            {isOpen ? (
              <FaCaretSquareLeft className="text-2xl bg-black text-white  absolute -right-2.5 top-7" onClick={toggle} />
            ) : (
              <FaCaretSquareRight className="text-2xl bg-black text-white  absolute -right-2.5" onClick={toggle} />
            )}
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link py-3 px-4 flex text-white gap-4 transition-all duration-500 hover:text-black hover:bg-customColor hover:px-5"
          >
            <div
              style={{ marginLeft: isOpen ? "30px" : "0px" }}
              className="text-xl mt-1"
            >
              {item.icon}
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="text-xl"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="w-full bg-zinc-200">
        {/*  */}
        {location.pathname === "/" ? (
          <LandingPage />
        ) : location.pathname === "/dashboard" ? (
          <Home />
        ) : location.pathname === "/interview" ? (
          <Interview />
        ) : location.pathname === "/insight" ? (
          <Analytics />
        ) : location.pathname === "/login" ? (
          <Login />
        ) : (
          <Faq />
        )}
        {/**/}
      </main>
      <ToastContainer position='top-center' />
    </div>
  );
};

export default Sidebar;

{
  /* <span className='flex gap-4 rounded-2xl p-3 hover:bg-customColor'>
                        <div className="text-xl mt-1">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="text-xl">{item.name}</div>
                        </span> */
}
