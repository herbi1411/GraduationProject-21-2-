import React, { useState, useEffect } from "react"

const Test = () => {
    const [timer,setTimer] = useState(0);
    const [timer2,setTimer2] = useState(0);
    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setTimer2((prev)=>prev+1);
            console.log(timer2);
        },1000);
        return ()=>clearTimeout(timerId);
    },[timer2])
    
    const onClick = (event) => {setTimer(0);}
    return (
        <>
        <h3>Hello</h3>
        <p>{timer2}</p>
        <button onClick = {onClick}>start timer</button>
        </>
    )
}

export default Test;