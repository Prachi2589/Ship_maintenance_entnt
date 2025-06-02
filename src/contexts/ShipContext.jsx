import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for ship data
const ShipContext = createContext();
export { ShipContext };

// Custom hook to use the ShipContext
export function useShips() {
  return useContext(ShipContext);
}

// Provider component to wrap the application with the ship data
export function ShipProvider({ children }) {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const dummyShips = [
      {
        id: "s1",
        name: "Ever Given",
        imo: "9811000",
        flag: "Panama",
        status: "Active"
      },
      {
        id: "s2",
        name: "Maersk Alabama",
        imo: "9164263",
        flag: "USA",
        status: "Under Maintenance"
      },
      {
        id: "s3",
        name: "OOCL Hong Kong",
        imo: "9732767",
        flag: "Hong Kong",
        status: "Active"
      }
    ];

    // Load ships from localStorage (if any)
    const storedShips = localStorage.getItem("ships");
    let loadedShips = [];

    if (storedShips) {
      try {
        loadedShips = JSON.parse(storedShips);
        console.log("Loaded ships from storage: ", loadedShips);
      } catch (err) {
        console.error("Error parsing ships from localStorage:", err);
      }
    }

    // Combine dummy + stored ships (you may want to avoid duplicates)
    const combinedShips = [...dummyShips, ...loadedShips];
    setShips(combinedShips);

    // Optional: Save combined list back to localStorage
    localStorage.setItem("ships", JSON.stringify(combinedShips));

  }, []);

  return (
    <ShipContext.Provider value={{ ships, setShips }}>
      {children}
    </ShipContext.Provider>
  );
}
