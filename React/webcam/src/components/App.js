import React, { useState, useEffect } from "react";
import WebcamCapture from "../routes/webcam"
import authService from "../fbase";
import AppRouter from "./Router";
function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn,setIsLoggedin] = useState(false);

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedin(true);
      }else{
        setIsLoggedin(false);
      }
      setInit(true);
    });
  },[]);


  return (
    <>
    {init ? <AppRouter isLoggedIn = {isLoggedIn}/> : "Initiallizing...."}
    {/* <footer> &copy;{new Date().getFullYear()} Nwitter-temp</footer> */}
    </>
  );
}

export default App;
