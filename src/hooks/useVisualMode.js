import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      back();
    }
    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
    history.pop();
    setHistory([...history]);
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
    }
  };

  return { mode, history, transition, back };
};

export default useVisualMode;
