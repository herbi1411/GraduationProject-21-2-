import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./webcam.css";
import { Grid, Typography } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { dbService } from "fbase";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
  const useStyles = makeStyles({
    label:{
        "font-family" : "'카페24 당당해', '맑은 고딕', serif",
    }
});

const WebcamCapture = ({userObj}) => {

    const [timerOn, setTimerOn] = useState(false);
    const [returnImgSrc,setReturnImgSrc] = useState("");
    const [blinkCount,setBlinkCount] = useState(0);
    const [avgBlinkTime,setAvgBlinkTime] = useState(0);

    const classes = useStyles()
    let prevBlink = Date.now();
    let startRecordAt = Date.now();
    let endRecordAt = Date.now();
    let tempBlinkCount = 0;

    const setPrevBlink = (now) => {prevBlink = now;}
    const getWebCamStyleObject = () =>{
      return timerOn ? {visibility: "hidden"} : {visibility: "visible"};
    };

    useEffect(()=>{
      if(timerOn){
        Notification.requestPermission();
        startRecordAt = Date.now();
        const id = setInterval(capture,150);
        return async() => {
          clearInterval(id);
          endRecordAt = Date.now();
          const avgBlinkPeriod = ((endRecordAt - startRecordAt)/tempBlinkCount);
          await dbService.collection("usageHistory").add({
            uid: userObj.uid,
            startRecordAt,
            blinkCount: tempBlinkCount,
            endRecordAt,
            avgBlinkPeriod,
          });
        }
      }
    },[timerOn]);
    
    const toggleSetTimerOn = () => {
      setPrevBlink(Date.now());
      setTimerOn(prev => !prev)
    }
    const writeLog = async() =>{
      await dbService.collection("log").add({
        blinkAt: Date.now(),
        uid: userObj.uid
      });
    }

    const webcamRef = React.useRef(null);
    const capture = () => {
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

          //
          const elapsedTime = Date.now() - prevBlink;
          // console.log(elapsedTime);
          if(elapsedTime >= 10000){
            Notification.requestPermission().then(() =>{
              const notification = new Notification("눈을 감아주세요!",{body: "10초동안 눈을 감지 않으셨습니다."});
            }); 
            setPrevBlink(Date.now());
          }
          //

          if(isBlink){
            if(elapsedTime >= 2000){
              setBlinkCount(prev => prev+1);
              tempBlinkCount+=1;
              setAvgBlinkTime(((Date.now() - startRecordAt) / 1000 / tempBlinkCount).toFixed(2));
              setPrevBlink(Date.now());
              // writeLog();
            }
          }   
        }
        ).catch((err)=>console.log(err));
      }

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
                  mirrored = {true}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={480}
                  videoConstraints={videoConstraints}
                />
            </Grid>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend" className={classes.label}>설정</FormLabel>
              <FormGroup >
                <FormControlLabel 
                  label= {<Typography className={classes.label}>눈 깜빡임 추적 시작</Typography>}
                  labelPlacement="start"
                  control={
                    <Switch checked={timerOn} onChange={toggleSetTimerOn} name="timerOn" color="secondary"/>
                  }
                />
              </FormGroup>
              <FormHelperText>Be careful</FormHelperText>
          </FormControl> 
          {/* <button onClick={toggleSetTimerOn}>Capture</button> */}
          </Grid>
          <h5>Blink Count : {blinkCount}</h5>
          <h5>평균 눈깜빡임 시간 : {avgBlinkTime}</h5>
        </>
    );
};
export default WebcamCapture;