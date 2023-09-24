import React, { createContext, useContext, useState } from 'react';

const ActiveTargetContext = createContext();

export const useActiveTarget = () => {
  return useContext(ActiveTargetContext);
};

export const ActiveTargetProvider = ({ children }) => {
  const [activeTarget, setActiveTarget] = useState('Desktop');

  return (
	<ActiveTargetContext.Provider value={{ activeTarget, setActiveTarget }}>
	  {children}
	</ActiveTargetContext.Provider>
  );
};
