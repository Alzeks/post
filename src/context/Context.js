"use client";

import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  return (
    <Context.Provider value={{ mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </Context.Provider>
  );
};
