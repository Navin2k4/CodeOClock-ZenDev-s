import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../../redux/user/userSlice";
import { MessageSquare } from "lucide-react";

export const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const dispatch = useDispatch();
  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <nav className="bg-green-800 text-white p-4">
      <div className=" flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          FarmZ
        </Link>
        <div className="space-x-4">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <h1 className="uppercase">
                {currentUser && currentUser.username}
              </h1>
              
          <Link to='/community' className="bg-green-200 text-black p-2 rounded-full ">
          <MessageSquare className="" size={24} />

          </Link>
              <Link
                to="/signin"
                className="hover:text-green-700 bg-white text-black  rounded-lg uppercase transition duration-300"
              >
                <Button onClick={handleSignout}>SignOut</Button>
              </Link>
            </div>
          ) : (
            <Link
              to="/signin"
              className="hover:text-green-700 bg-white text-black p-2 rounded-lg uppercase transition duration-300"
            >
              <Button onClick={handleSignout}>Signin</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
