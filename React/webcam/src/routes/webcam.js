import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./webcam.css";
import { Grid } from "@material-ui/core";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };


const WebcamCapture = () => {

    const [timer,setTimer] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [returnImgSrc,setReturnImgSrc] = useState("");
    const [blinkCount,setBlinkCount] = useState(0);
    // useEffect(()=>{
    //   const timerid = setTimeout(()=>{
    //   capture();
    //   // testFunc();
    //   console.log("실행중!!");
    //   setTimer((prev)=>prev+1);
    // },1000);
    // return  ()=>clearTimeout(timerid);
    // },[timer]);
    //


    //
    // const useInterval = (callback,delay) =>{
    //   const savedCallback = React.useRef();

    //   useEffect(()=>{
    //     savedCallback.current = callback;
    //   });
      
    //   useEffect(()=>{
    //     const tick = () =>{
    //       savedCallback.current();
    //     }
        
    //     let id = setInterval(tick,delay);
    //     return () => clearInterval(id);
    //   },[delay]);

    // }

    // useInterval(()=>{setTimer((prev)=>(prev+1))},1000);
    
    useEffect(()=>{
      if(timerOn){
        const id = setInterval(capture,300);
        return () => clearInterval(id);
      }
    },[timerOn]);


    const toggleSetTimerOn = () => {setTimerOn(prev => !prev)}
    //
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        axios.post("/fileUpload",{
          "title" : "???",
          "genre" : "dsda",
          "year" : 1985,
          "data" : imageSrc
        },{headers: { "Content-Type": `application/json`}}).then(response => {

          // console.log(response);
          const returnImageSrc = response.data.data;
          const isBlink = response.data.pred;
          // console.log(returnImageSrc);
          setReturnImgSrc(returnImageSrc);
          if(isBlink) setBlinkCount(prev => prev+1);
        }
        ).catch((err)=>console.log(err));
      },
      [webcamRef]
    );
    
    const testFunc = () => {console.log("I'm test Function!!");}
    // const capture = () => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     if(imageSrc !== null){
    //       console.log(imageSrc)
    //       axios.post("/fileUpload",{
    //         "title" : "???",
    //         "genre" : "dsda",
    //         "year" : 1985,
    //         "data" : imageSrc
    //       },{headers: { "Content-Type": `application/json`}}).then(response => console.log(response)).catch((err)=>console.log(err));
    //     }
    //   }

    return (
        <>
          <Grid item xs>
          <Webcam
            className = "ha"
            audio={false}
            height={320}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={480}
            videoConstraints={videoConstraints}
          />
          {/* <button onClick={capture}>Capture</button> */}
          <button onClick={toggleSetTimerOn}>Capture</button>
          <button /*onClick={()=>setTimer(1)}*/>Capture photo</button>
          </Grid>
          {timerOn ? <img src={returnImgSrc}/> : <img src=""/>}
          <span>Blink Count : {blinkCount}</span>
          {/* {timer} */}
        </>
    );
};
export default WebcamCapture;