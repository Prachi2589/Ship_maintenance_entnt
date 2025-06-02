import React, { createContext, useContext, useEffect, useState } from 'react';

const ComponentsContext = createContext();

const defaultComponents = [
  {
    id: 'c1',
    shipId: 's1',
    name: 'Main Engine',
    serialNumber: 'ME-1234',
    installDate: '2020-01-10',
    lastMaintenanceDate: '2025-05-10',
  },
  {
    id: 'c2',
    shipId: 's2',
    name: 'Radar',
    serialNumber: 'RAD-5678',
    installDate: '2021-07-18',
    lastMaintenanceDate: '2025-05-11',
  },
];

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const storedComponents = localStorage.getItem('components');
    if (storedComponents) {
      const parsedComponents = JSON.parse(storedComponents);
      console.log("Loaded Components From Storage: ", parsedComponents);
      // Combine stored components with default ones (if not already present)
      setComponents([...defaultComponents, ...parsedComponents]);
    } else {
      console.log("Using Default Components: ", defaultComponents);
      setComponents(defaultComponents);
      localStorage.setItem('components', JSON.stringify(defaultComponents));
    }
  }, []);

  return (
    <ComponentsContext.Provider value={{ components, setComponents }}>
      {children}
    </ComponentsContext.Provider>
  );
};

export const useComponentsContext = () => useContext(ComponentsContext);
