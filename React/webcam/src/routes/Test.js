import React, { useState, useEffect } from "react"

const Test = () => {
    const [timerOn,setTimerOn] = useState(false);
    const [timer,setTimer] = useState(0);
    const [prevBlink,setPrevBlink] = useState(0);
    // let prevBlink = 0;

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

    return (
        <>
        <h3>Timer</h3>
        <p>{timer}</p>
        <button onClick = {() =>{setTimerOn(prev=>!prev)}}>start timer</button>
        <p>Prev Blink : {prevBlink}</p>
        </>
    )
}

export default Test;