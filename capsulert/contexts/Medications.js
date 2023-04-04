import { createContext, useState } from "react";

export const MedicationsContext = createContext();

export const MedicationsProvider = ({ children }) => {
  const [medicationData, setMedicationData] = useState([]);

  return (
    <MedicationsContext.Provider value={{ medicationData, setMedicationData }}>
      {children}
    </MedicationsContext.Provider>
  );
};
