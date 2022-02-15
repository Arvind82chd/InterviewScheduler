import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {

    if (replace) {
      
      setHistory(prevHistory => {
        const historyCopy = [ ...prevHistory ]
        historyCopy.pop();
        historyCopy.push(newMode);
        return historyCopy;
      })
      setMode(newMode)
    } 
    else {
      setMode(newMode);
      setHistory(prevHistory => [ ...prevHistory, newMode ])
    }
   
  }

  function back() {
    
    //setMode(initial);
  
    if(history.length > 1) {
      const historyCopy = [ ...history ]
      historyCopy.pop();
      //setMode(history[history.length - 2]);
     // history.pop();
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]);
    } 
  }
  console.log(mode, history)
  return { mode, transition, back };
}

