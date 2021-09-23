import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./webcam.css";
import { Grid } from "@material-ui/core";
import { dbService } from "fbase";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

const WebcamCapture = ({userObj}) => {

    const [timer,setTimer] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [returnImgSrc,setReturnImgSrc] = useState("");
    const [blinkCount,setBlinkCount] = useState(0);
   
    let prevBlink = 0;
    const setPrevBlink = (now) => {prevBlink = now;}
    const getWebCamStyleObject = () =>{
      return timerOn ? {visibility: "hidden"} : {visibility: "visible"};
    };

    useEffect(()=>{
      if(timerOn){
        const id = setInterval(capture,150);
        return () => clearInterval(id);
      }
    },[timerOn]);

    useEffect(()=>{
      prevBlink = Date.now();
    },[])
    const toggleSetTimerOn = () => {setTimerOn(prev => !prev)}
    const writeLog = async() =>{
      await dbService.collection("log").add({
        blinkAt: Date.now(),
        uid: userObj.uid
      });
    }
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
        },{headers: { "Content-Type": `application/json`}}).then(response =>{

          const returnImageSrc = response.data.data;
          const isBlink = response.data.pred;
          setReturnImgSrc(returnImageSrc);
          if(isBlink){
            if(Date.now() - prevBlink >= 3000){
              // console.log("Date.now : ", Date.now());
              // console.log("PrevBlink: ",prevBlink);
              setBlinkCount(prev => prev+1);
              setPrevBlink(Date.now());
              writeLog();
            }
          }   
        }
        ).catch((err)=>console.log(err));
      },
      [webcamRef]
    );
    
    return (
        <>
          <Grid item xs>
            <Grid>
                {timerOn && <img src={returnImgSrc}/>}
                <Webcam
                  style = {getWebCamStyleObject()}
                  className = "ha"
                  audio={false}
                  height={320}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={480}
                  videoConstraints={videoConstraints}
                />
            </Grid> 
          <button onClick={toggleSetTimerOn}>Capture</button>
          </Grid>
          <h5>Blink Count : {blinkCount}</h5>
        </>
    );
};
export default WebcamCapture;