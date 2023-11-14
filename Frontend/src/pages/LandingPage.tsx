import React from "react";
import { useNavigate } from "react-router-dom";
import mockup from "../assets/Talent Tech.png";
import { BsMedium } from "react-icons/bs";

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login")
    }

  return (
    <div className="text-white text-center bg-gradient-to-t from-purple-700 via-indigo-700 to-gray-900">
      <div className="flex justify-between items-center p-4">
        <div className="flex">
          <BsMedium className="pt-1 text-4xl text-customColor" />
          <h1 className="text-3xl ms-3">Recruiter</h1>
        </div>
        <div className="flex items-center">
          <p className="mr-2.5 text-emerald-500 font-bold font-sans">Try for free</p>
          <button className="px-4 py-2 bg-violet-600 font-black text-white rounded-md" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-36 mb-24">
        <p className="text-5xl font-black mb-4 font-sans">Ace Your Professional Journey</p>
        <p className="text-3xl font-black mb-4 text-emerald-500 font-sans">Dominating Every Interview Opportunity 🎯</p>
        <p className="text-xl font-medium italic">Leave behind the old ways of interview prep.</p>
        <p className="text-xl font-medium italic mb-4">Embrace the future with AI-powered interview prep that's smart and effective.</p>
      </div>
      <div className="w-90p mx-auto">
        <img src={mockup} alt="Mockup" />
      </div>
    </div>
  );
};

export default LandingPage;