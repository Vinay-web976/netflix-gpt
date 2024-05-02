import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        dispatch(setUser({ uid, displayName, photoURL, email }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="absolute w-screen bg-gradient-to-b from-black h-auto pl-8 py-4 flex justify-between z-10">
      <img src={LOGO} alt="" className="w-40 h-16 " />
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
