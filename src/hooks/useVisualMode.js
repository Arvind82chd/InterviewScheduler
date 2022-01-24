export function useVisualMode (initial) {
  function transition() {
    const [mode, setMode] = useState(initial);
    
    setMode(mode)
    
  }
  console.log(transition);
  return { transition };
}

// function useCustomHook() {
//   function action() {}

//   return { action };
// }