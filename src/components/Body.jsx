import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Browse from "./Browse";
import Login from "./Login";
import { removeUser, setUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";

const Body = () => {
  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, photoURL, email } = user;
      dispatch(setUser({ uid, displayName, photoURL, email }));
    } else {
      dispatch(removeUser());
    }
  });
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
