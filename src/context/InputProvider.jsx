import React, { useState, useCallback } from "react";
import heikoApi from "../service/myApi";
import { InputContext } from "./InputContext";
// const [loading, setLoading] = useState(true);

const InputProvider = ({ children }) => {
  const [inputsData, setInputsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // get one input :
  const fetchInput = useCallback(async (inputId) => {
    // useCallback : to avoid infinite loop when fetchInput
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get(`/inputs/${inputId}`);
      setInputsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch input", error);
      setError("Failed to fetch input");
    } finally {
      setLoading(false);
    }
  }, []);

  // get all inputs :
  const fetchAllInputs = useCallback(async () => {
    // useCallback : to avoid infinite loop when fetchAllsInputs
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.get(`/inputs`);
      setInputsData(response.data);
    } catch (error) {
      console.error("Failed to fetch inputs", error);
      setError("Failed to fetch inputs");
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new input or update an existing input
  const upsertInput = useCallback(async (inputData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await heikoApi.post(`/inputs/upsert`, inputData);
      setInputsData((prevInputs) => [...prevInputs, response.data]);
      console.log("Upsert successful", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to upsert input", error);
      setError("Failed to upsert input");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <InputContext.Provider
      value={{
        inputsData,
        setInputsData,
        fetchInput,
        fetchAllInputs,
        upsertInput,
        loading,
        error,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export { InputProvider };
