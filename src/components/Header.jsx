import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleShowGPTSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGPTSearch);

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

  const handleGptClick = () => {
    dispatch(toggleShowGPTSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen bg-gradient-to-b from-black h-auto pl-8 py-4 flex justify-between z-10">
      <img src={LOGO} alt="" className="w-40 h-16 " />
      {userData && (
        <div className="pr-8 py-4 flex">
          {showGptSearch && (
            <select
              className="p-2 mr-4 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white bg-purple-600 px-4 py-1 mr-16  rounded-lg"
            onClick={handleGptClick}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img src={userData.photoURL} alt="" className="w-12 h-12" />

          <button
            className="text-white bg-gray-600 px-4 py-1 ml-3 rounded-lg hover:bg-gray-800"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
