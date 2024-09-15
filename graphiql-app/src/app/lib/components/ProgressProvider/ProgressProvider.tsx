"use client";

import React, { FC, PropsWithChildren, createContext, useState } from "react";

type ProgressContextType = {
  prog: boolean;
  setInProgress: (value: boolean) => void;
};

export const PROGRESS_CONTEXT = createContext<ProgressContextType>({
  prog: false,
  setInProgress: () => {},
});

export const ProgressProvider: FC<PropsWithChildren> = ({ children }) => {
  const [prog, setProg] = useState<boolean>(false);
  return (
    <PROGRESS_CONTEXT.Provider value={{ prog, setInProgress: setProg }}>
      {children}
    </PROGRESS_CONTEXT.Provider>
  );
};
