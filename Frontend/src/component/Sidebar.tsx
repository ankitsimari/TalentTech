import React, { useState } from 'react';
import {AiFillSetting,AiOutlineSetting,AiOutlineLeftCircle,AiOutlineRightCircle,AiOutlineQuestionCircle} from "react-icons/ai"
import {MdOutlineFeedback,MdInsights} from "react-icons/md"
import {RxDashboard} from "react-icons/rx"
import {LuMonitorSmartphone} from "react-icons/lu"
import {BsMedium,BsChatLeftDots} from "react-icons/bs"
import { NavLink, useLocation } from 'react-router-dom';
import Home from './Home';

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
            icon: <RxDashboard />
        },
        {
            path: "/interview",
            name: "Interview",
            icon: <LuMonitorSmartphone />
        },
        {
            path: "/insight",
            name: "Insight",
            icon: <MdInsights />
        },
        {
            path: "/feedback",
            name: "Feedback",
            icon: <MdOutlineFeedback />
        },
        {
            path: "/settings",
            name: "Settings",
            icon: <AiOutlineSetting />
        },
        {
            path: "/faq",
            name: "FAQ",
            icon: <AiOutlineQuestionCircle />
        }
    ];

    return (
        <div className="flex">
            <div style={{ width: isOpen ? "250px" : "50px" }} className=" h-screen bg-black text-white transition-all duration-500">
                <div className=" px-4 py-5 flex items-center mb-6">
                <span  style={{ display: isOpen ? "block" : "none" }}>
                    <div className='flex'>
                    <BsMedium className=' pt-1 text-4xl text-customColor'/>
                        <h1  className="text-3xl ms-3">Interview</h1>
                    </div>
                       
                        </span>
                    
                    <div style={{ marginLeft: isOpen ? "20px" : "0px" }} className="mt-2 flex text-2xl ">
                        {/* <FaBars onClick={toggle} /> */}
                        {isOpen?<AiOutlineLeftCircle className='text-3xl' onClick={toggle}  />: <AiOutlineRightCircle className='text-3xl' onClick={toggle} />}
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link py-3 px-4 flex text-white gap-4 transition-all duration-500 hover:text-black hover:bg-customColor hover:px-5" >
                        <div style={{ marginLeft: isOpen ? "30px" : "0px" }} className="text-xl mt-1">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="text-xl">{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main className='w-full p-5'>
                
                {/*  */}
                {location.pathname === '/' ? <Home/> : location.pathname === '/interview' ? <h1 className='text-center text-customColor font-bold text-6xl mt-48'> Interview </h1>  : location.pathname === '/insight' ? <h1 className='text-center text-customColor font-bold text-6xl mt-48'> Insight </h1> :location.pathname === "/feedback"?<h1 className='text-center text-customColor font-bold text-6xl mt-48'> Feedback </h1>: location.pathname === "/settings"? <h1 className='text-center text-customColor font-bold text-6xl mt-48'> Tata-bye-bye-Khtam </h1>  :'Nothing'}
                {/**/}
            </main>
        </div>
    );
};


export default Sidebar;

    {/* <span className='flex gap-4 rounded-2xl p-3 hover:bg-customColor'>
                        <div className="text-xl mt-1">{item.icon}</div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="text-xl">{item.name}</div>
                        </span> */}