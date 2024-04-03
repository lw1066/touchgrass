import React, { createContext, useContext, useState } from 'react';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const incrementScore = () => {
    setScore(score + 100);
  };

  return (
    <ScoreContext.Provider value={{ score, incrementScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
