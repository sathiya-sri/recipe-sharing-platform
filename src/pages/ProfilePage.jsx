import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center p-2 py-10 bg-[#fce3fe]">
      <div className="w-[300px] h-[400px] bg-white flex flex-col items-center justify-center gap-4 rounded-md shadow-lg">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT23poIyRq2u2L-NbcrPoD06zcVp8pb6DT6gA&s"
          alt=""
          className="rounded-full w-32 h-32 object-cover border-2 p-1 border-[#ff4141]"
        />
        <p className="uppercase text-sm font-light text-black">{user?.name}</p>
        <p className="uppercase text-sm font-light text-black">{user?.email}</p>
        <div className="flex items-center gap-2">
          <p className="uppercase text-xs font-light text-black">
            10 recipes added
          </p>
          <span className="w-0.5 h-6 bg-black"></span>
          <p className="uppercase text-xs font-light text-black">
            10 recipes saved
          </p>
        </div>
        <button className="text-[#ff4141] border border-[#ff4141] px-6 py-2 text-xs hover:bg-[#ff4141] hover:text-white transition-all duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
