import React from "react";
import { useNavigate } from "react-router-dom";
import mockup from "../assets/Talent Tech.png";
import { BsMedium } from "react-icons/bs";
import { getAuthTokenFromCookie } from "../utils/cookie";
import Logo from "../assets/Logo.png"

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store: Store) => {
    return store.authReducer;
  });
    const cookie = getAuthTokenFromCookie()

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="text-white text-center bg-gradient-to-t from-purple-700 via-indigo-700 to-gray-900">
      <div className="flex justify-end items-center p-4">
        
        <div className="flex items-center">
          {/* <button className="px-4 py-2 bg-violet-600 font-black text-white rounded-md" onClick={handleLoginClick}>Login</button> */}
          {cookie ? (
            <button
              type="button"
              className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 mt-5"
              onClick={handleDashboardClick}
            >
              Dashboard
            </button>
          ) : (
            <button
              type="button"
              className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2 mt-5"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className="w-max m-auto">
          <img src={Logo} alt="Talent Tech AI" style={{width:"400px"}} />
      </div>
      <div className="flex flex-col justify-center items-center mt-36 mb-24">
        <p className="text-5xl font-black mb-4 font-sans">
          Ace Your Professional Journey
        </p>
        <p className="text-3xl font-black mb-4font-sans">
          Dominating Every Interview Opportunity 🎯
        </p>
        <p className="text-xl font-medium italic">
          Leave behind the old ways of interview prep.
        </p>
        <p className="text-xl font-medium italic mb-4">
          Embrace the future with AI-powered interview prep that's smart and
          effective.
        </p>
      </div>
      <div className="w-90p mx-auto">
        <img src={mockup} alt="Mockup" />
      </div>
    </div>
  );
};

export default LandingPage;
