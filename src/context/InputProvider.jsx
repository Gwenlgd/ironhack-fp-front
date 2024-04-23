import React, { useState, useCallback } from "react";
import heikoApi from "../service/myApi";
import { InputContext } from "./InputContext";

const InputProvider = ({ children }) => {
  const [inputsData, setInputsData] = useState(null);

  // get one input :
  const fetchInput = async (inputId) => {
    try {
      const response = await heikoApi.get(`/inputs/${inputId}`);
      setInputsData(response.data);
    } catch (error) {
      console.error("Failed to fetch input", error);
    }
  };

  // get all product :
  const fetchAllInputs = useCallback(async () => {
    // useCallback : to avoid infinite loop when fetchAllsProducts
    try {
      const response = await heikoApi.get(`/inputs`);
      setInputsData(response.data);
    } catch (error) {
      console.error("Failed to fetch inputs", error);
    }
  }, []);

  return (
    <InputContext.Provider
      value={{ inputsData, setInputsData, fetchInput, fetchAllInputs }}
    >
      {children}
    </InputContext.Provider>
  );
};

export { InputProvider };
