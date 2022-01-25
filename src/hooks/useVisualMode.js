import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if (!replace) {
      history.push(newMode);
      setMode(newMode)
    } else {}
    
    //console.log(history, 'hNm: ', newMode)
    
  }

  function back() {
    setMode(initial);
    //setMode(prevMode => prevMode )
    if(history.length > 1) {
      setMode(history[history.length - 2]);
      history.pop();
      setHistory(history);
    } else if (history.length === 1) {
      setMode(history[0]);
      setHistory(history);

    }

  }


  console.log(transition);
  return { mode, transition, back };
}

// function useCustomHook() {
//   function action() {}

//   return { action };
// }