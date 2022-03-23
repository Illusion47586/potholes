import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MapContext = createContext(null);

const MapContextProvider = ({ children }) => {
  const navigate = useNavigate();

  setInterval(getPotholes, 300);

  const getPotholes = async () => {
    const data = await axios.get("");
  };

  return <MapContext.Provider value={{}}>{children}</MapContext.Provider>;
};

export { MapContext, MapContextProvider };
