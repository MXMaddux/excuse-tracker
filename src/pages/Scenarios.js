import React from "react";
import ScenarioList from "../components/ScenarioList";

const Scenarios = ({ onAddExcuse }) => {
  return (
    <div>
      <ScenarioList onAddExcuse={onAddExcuse} />
    </div>
  );
};

export default Scenarios;
