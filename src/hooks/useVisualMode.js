import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if (replace) {
      history.push(newMode);
     // setMode(prev => [...prev, newMode])
      setMode(newMode)
    } else setMode(newMode);
   // console.log('history---> ',history, 'hNm: ', newMode)
  }

  function back() {
    //console.log('history b1---> ',history, 'hNm: ', newMode)
    setMode(initial);
    //console.log('history b2---> ',history)
    //setMode(prevMode => prevMode )
    if(history.length >= 1) {
      setMode(history[history.length - 2]);
      history.pop();
      setHistory(history);
     // console.log('history b3---> ',history)
    } 
  //   else if (history.length === 1) {
  //     setMode(history[0]);
  //     setHistory(history);
  //  }

  }
  //console.log(transition);
  return { mode, transition, back };
}

