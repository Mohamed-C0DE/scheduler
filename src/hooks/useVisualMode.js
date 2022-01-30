import { useState } from "react";

const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);

  // CHANGE MODE FUNC
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  // MOVE TO PREV MODE FUNC
  const back = () => {
    if (history.length <= 1) {
      return;
    }
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
