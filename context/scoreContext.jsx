import { React, createContext, useState } from "react";

const ScoreContext = createContext();
export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);
  return (
    <>
      <ScoreContext.Provider value={{ score, setScore }}>
        {children}
      </ScoreContext.Provider>
    </>
  );
}

export const useScoreValue= ()=>{
  React.useContext(ScoreContext)
}
