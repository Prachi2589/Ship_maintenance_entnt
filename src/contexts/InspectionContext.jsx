// src/contexts/InspectionContext.jsx
import React, { createContext, useState } from 'react';

export const InspectionContext = createContext();

export const InspectionProvider = ({ children }) => {
  const [inspections, setInspections] = useState([
    {
      id: 1,
      ship: 'Ship A',
      component: 'Engine',
      scheduledDate: '2025-06-10',
      status: 'pending',
    },
    {
      id: 2,
      ship: 'Ship B',
      component: 'Hull',
      scheduledDate: '2025-07-15',
      status: 'completed',
    },
    {
      id: 3,
      ship: 'Ship C',
      component: 'Radar',
      scheduledDate: '2025-08-01',
      status: 'in progress',
    },
  ]);

  console.log("Loaded Inspections: ", inspections)

  return (
    <InspectionContext.Provider value={{ inspections, setInspections }}>
      {children}
    </InspectionContext.Provider>
  );
};
