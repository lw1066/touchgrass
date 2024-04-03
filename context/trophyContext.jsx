import React, { createContext, useContext, useState } from "react";

const TrophyContext = createContext();

export const TrophyProvider = ({ children }) => {
  const [trophy, setTrophy] = useState();

  return (
    <TrophyContext.Provider value={{ trophy, setTrophy }}>
      {children}
    </TrophyContext.Provider>
  );
};

export const useTrophy = () => useContext(TrophyContext);
