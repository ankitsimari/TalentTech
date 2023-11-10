import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
} from "react-icons/fa";
import {AiFillSetting} from "react-icons/ai"
import {FcOnlineSupport} from "react-icons/fc"
import {BsMedium} from "react-icons/bs"
import { NavLink, useLocation } from 'react-router-dom';

interface MenuItem {
    path: string;
    name: string;
    icon: JSX.Element;
}

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const location = useLocation();
    console.log(location.pathname)

    const menuItem: MenuItem[] = [
        {
            path: "/",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/user",
            name: "User",
            icon: <FaUserAlt />
        },
        {
            path: "/analytics",
            name: "Analytics",
            icon: <FaRegChartBar />
        },
        {
            path: "/feedback",
            name: "Feedback",
            icon: <FaCommentAlt />
        },
        {
            path: "/settings",
            name: "Settings",
            icon: <AiFillSetting />
        }
    ];

    return (
        <div className="flex">
            <div style={{ width: isOpen ? "250px" : "50px" }} className="h-screen bg-black text-white transition-all duration-500">
                <div className=" px-4 py-5 flex items-center">


                <span  style={{ display: isOpen ? "block" : "none" }}>
                    <div className='flex'>
                    <BsMedium className=' pt-1 text-4xl text-customColor'/>
                        <h1  className="text-3xl ms-3">Ankit</h1>
                    </div>
                       
                        </span>
                    
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className=" flex text-2xl ml-12">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link py-3 px-4 flex text-white gap-4 transition-all duration-500 hover:text-black hover:bg-customColor hover:px-5" >
                        <div className="text-xl mt-1">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="text-xl">{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main className='w-full p-5'>
                
                <h1 className='text-center text-red-700 font-bold text-3xl'>
                {location.pathname === '/' ? 'Home' : location.pathname === '/user' ? 'User' : location.pathname === '/analytics' ? 'analytics':location.pathname === "/feedback"?"Feedback" : location.pathname === "/settings"? "settings"  :'Nothing'}
                </h1>
            </main>
        </div>
    );
};


export default Sidebar;

