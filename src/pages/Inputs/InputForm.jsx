import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../context/InputContext";

const InputForm = () => {
  const [date, setDate] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [moods, setMoods] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const navigate = useNavigate();
  const { upsertInput, error } = useInput();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputData = {
      date,
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
      moods: moods.split(",").map((mood) => mood.trim()),
      symptoms: symptoms.split(",").map((symptom) => symptom.trim()),
    };

    await upsertInput(inputData);
    if (!error) {
      alert("Input saved successfully!");
      navigate.push("/inputs");
    } else {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients (comma separated):</label>
        <input
          type="text"
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., apples, bananas, carrots"
        />
      </div>
      <div>
        <label htmlFor="moods">Moods (comma separated):</label>
        <input
          type="text"
          id="moods"
          value={moods}
          onChange={(e) => setMoods(e.target.value)}
          placeholder="e.g., happy, sad, anxious"
        />
      </div>
      <div>
        <label htmlFor="symptoms">Symptoms (comma separated):</label>
        <input
          type="text"
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g., headache, nausea, fatigue"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
