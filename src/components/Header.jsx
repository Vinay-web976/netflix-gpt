import React from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="bg-gradient-to-b from-black h-auto pl-8 py-4 flex justify-between">
      <img
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt=""
        className="w-40 h-16 "
      />
      {userData && (
        <div className="pr-8 py-4 flex">
          <img src={userData.photoURL} alt="" className="w-12 h-12" />
          <button className="text-white font-bold" onClick={handleSignOut}>
            - Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
