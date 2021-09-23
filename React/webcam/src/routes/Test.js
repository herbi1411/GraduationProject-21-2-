import React, { useState, useEffect } from "react"

const Test = () => {
    const [timerOn,setTimerOn] = useState(false);
    const [timer,setTimer] = useState(0);
    const [prevBlink,setPrevBlink] = useState(0);

    //
    const [timerOn2,setTimerOn2] = useState(false);
    // let prevBlink = 0;
    
    let prevBlink2 = Date.now();
    // let prevBlink2 = 0; //Not working.. why??

    useEffect(()=>{
        if(timerOn){
            const timerId = setInterval(()=>{
                setTimer((prev)=>prev+1);
                setPrevBlink(prev => prev+1);
                // prevBlink +=1;
                console.log(prevBlink);
            },1000);
            return ()=>clearInterval(timerId);
        }

    },[timerOn]);

    useEffect(()=>{
        if(timerOn2){
            const timerId2 = setInterval(()=>{
               capture();
            },500);
            return () => clearInterval(timerId2);
        }
    },[timerOn2]);

    const toggleAutoIncreasing = () => {
        prevBlink2 = Date.now();
        setTimerOn2(prev => !prev);
    }

    const capture = () => {
        console.log(Date.now() - prevBlink2);
    }
    return (
        <>
        <div>
            <h3>Timer</h3>
            <p>{timer}</p>
            <button onClick = {() =>{setTimerOn(prev=>!prev)}}>start timer</button>
            <p>Prev Blink : {prevBlink}</p>
        </div>
        <div>
            <h3>Auto Increasing</h3>
            <p>{prevBlink2}</p>
            <button onClick = {toggleAutoIncreasing}>start Auto Increasing</button>
        </div>        
        </>
    )
}

export default Test;