import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateLoginSignUpfields } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const userName = useRef(null);

  const handleButtonClick = () => {
    const error = isSignIn
      ? validateLoginSignUpfields(email.current.value, password.current.value)
      : validateLoginSignUpfields(
          email.current.value,
          password.current.value,
          userName.current.value
        );
    if (error) setErrorMessage(error);
    else {
      if (!isSignIn) {
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            setErrorMessage(error.code + "-" + error.message);
          });
      } else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            console.log(userCredential);
          })
          .catch((error) => {
            setErrorMessage(error.code + "-" + error.message);
          });
      }
    }
  };
  return (
    <div className="h-screen w-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/058eee37-6c24-403a-95bd-7d85d3260ae1/e10ba8a6-b96a-4308-bee4-76fab1ebd6ca/IN-en-20240422-POP_SIGNUP_TWO_WEEKS-perspective_WEB_db9348f2-4d68-4934-b495-6d9d1be5917e_large.jpg')]">
      <Header />
      <div className="flex align-middle justify-center p-8 flex-col w-[25%] m-auto text-white bg-black/[0.7]">
        <h1 className="font-bold text-3xl">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        <form
          className="flex flex-col mt-5"
          onSubmit={(e) => e.preventDefault()}
        >
          {!isSignIn && (
            <input
              type="text"
              className="p-4 bg-black mb-5 rounded-md"
              placeholder="Full Name"
              ref={userName}
            />
          )}
          <input
            type="text"
            className="p-4 bg-black mb-5 rounded-md"
            placeholder="Email"
            ref={email}
          />
          <input
            type="password"
            className="p-4 bg-black mb-5 rounded-md"
            placeholder="Password"
            ref={password}
          />
          {errorMessage && (
            <p className="text-[rgb(229,9,20)] font-bold m-2">{errorMessage}</p>
          )}
          <button
            className="font-bold bg-[rgb(229,9,20)] p-3 rounded-md"
            onClick={handleButtonClick}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          <p className="mt-5">
            {isSignIn ? "New to Netflix ?" : "Already registered ?"}
            <span
              className="font-bold cursor-pointer pl-2"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Sign up now" : "Sign in now"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
