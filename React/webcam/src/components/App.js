import React, { useState, useEffect } from "react";
import WebcamCapture from "../routes/webcam"
import authService from "../fbase";
import AppRouter from "./Router";
function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn,setIsLoggedin] = useState(false);
  const [userObj,setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedin(true);
        setUserObj(user);
      }else{
        setIsLoggedin(false);
        setUserObj(null);
      }
      setInit(true);
    });
  },[]);


  return (
    <>
    {init ? <AppRouter isLoggedIn = {isLoggedIn} userObj = {userObj}/> : "Initiallizing...."}
    {/* <footer> &copy;{new Date().getFullYear()} Nwitter-temp</footer> */}
    </>
  );
}

export default App;
