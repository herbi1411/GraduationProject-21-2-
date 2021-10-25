import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./webcam.css";
import { Grid, Typography, Container, TextField } from "@material-ui/core";
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
    flabel:{
        "fontFamily" : "'카페24 당당해', '맑은 고딕', serif",
        // textAlign : "center",
    },
    fclabel:{
      fontFamily: "'카페24 당당해', '맑은 고딕', serif",
    },
    talabel:{
      textAlign: "left",
      // marginLeft: "23px",
      fontFamily: "'카페24 당당해', '맑은 고딕', serif",
      marginTop: 5,
      marginLeft: 15,
    },
    tField:{
      width: 60,
    },
    sectypo:{
      marginTop: 3,
      fontFamily: "'카페24 당당해', '맑은 고딕', serif"
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
    let alertInterval = 10;

    const setPrevBlink = (now) => {prevBlink = now;}
    const getWebCamStyleObject = () =>{
      // return timerOn ? {visibility: "hidden"} : {visibility: "visible"};
      // return timerOn ? {display: "none"} : {display: "block"};
      return timerOn ? {visibility: "hidden" , display: "hidden"} : {visibilitiy: "visible", display: "block"};
    };
    const getWebCamStyleObject2 = () =>{
      return {visibility: "hidden" , display: "hidden"};
    }

    useEffect(()=>{
      if(timerOn){
        Notification.requestPermission();
        startRecordAt = Date.now();
        const id = setInterval(capture,150);
        return async() => {
          clearInterval(id);
          if(tempBlinkCount != 0){
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
          tempBlinkCount = 0;
          setBlinkCount(0);
          setAvgBlinkTime(0);
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
          console.log(elapsedTime);
          console.log("ALERTINTERVAL:" + alertInterval);
          if(elapsedTime >= alertInterval * 1000){
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
    const setAlertInterval = (event) => {
      // let target = 0;
      // if(val < 0){
      //   target = 0;
      // }else if (val > 30){
      //   target = 30;
      // }else{
      //   target = val;
      // }
      // shrinkval = target
      console.log(event.target.value);
      alertInterval = event.target.value;
      console.log("ALERTINTERVAL:" + alertInterval);
    }
    return (
        <>
          <Container fixed maxWidth = "xs">
                {timerOn ? <img src={returnImgSrc}/> : <Webcam
                  style = {getWebCamStyleObject()}
                  className = "ha"
                  audio={false}
                  height={320}
                  mirrored = {true}
                  // ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={480}
                  videoConstraints={videoConstraints}
                  justifycontent="center"
                  />
                }
                  {/* {timerOn && <img src={returnImgSrc}/>} 
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
                  justifycontent="center"
                  /> */}

          </Container>
          <Container fixed maxWidth="xs">
              <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend" className={classes.flabel}>설정</FormLabel>
                      <FormGroup>
                        <FormControlLabel 
                          label= {<Typography className={classes.fclabel}>눈 깜빡임 추적 시작</Typography>}
                          labelPlacement="start"
                          control={
                            <Switch checked={timerOn} onChange={toggleSetTimerOn} name="timerOn" color="secondary"/>
                          }
                          style={{align:"left"}}
                        />
                        </FormGroup>
                        <FormGroup>
                        <Grid container spacing={1}>
                        <Grid item xs = {7}>
                          <Typography className={classes.talabel}>알림 간격</Typography>
                        </Grid>
                        <Grid item xs = {4}>
                          <TextField
                                className= {classes.tField}
                                id="outlined-number"
                                // label= {<Typography className={classes.talabel}>알림 간격</Typography>}
                                type="number"
                                // InputLabelProps={{
                                //   shrink: true,
                                // }}
                                // value = {shrinkval}
                                onChange = {setAlertInterval}
                                inputProps={{ max: 20, min: 3}}
                                defaultValue = {10}
                                size = "small"
                                variant = "outlined"
                            />
                        </Grid>
                        <Grid item xs = {1}>
                        <Typography className = {classes.sectypo}> 초</Typography>
                        </Grid>
                        </Grid>
                      </FormGroup>
                    {/* <FormHelperText>Be careful</FormHelperText> */}
              </FormControl> 
              {/* <button onClick={toggleSetTimerOn}>Capture</button> */}
              <h5>Blink Count : {blinkCount}</h5>
              <h5>평균 눈깜빡임 시간 : {avgBlinkTime}</h5>
          </Container>
          <Container>
            {/* {timerOn && <Webcam
                  style = {getWebCamStyleObject()}
                  className = "ha"
                  audio={false}
                  height={320}
                  mirrored = {true}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={480}
                  videoConstraints={videoConstraints}
                  justifycontent="center"
                  />} */}
            <Webcam
                  style = {getWebCamStyleObject2()}
                  className = "ha"
                  audio={false}
                  height={320}
                  mirrored = {true}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={480}
                  videoConstraints={videoConstraints}
                  justifycontent="center"
                  />
          </Container>
        </>
    );
};
export default WebcamCapture;