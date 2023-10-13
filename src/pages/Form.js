import React, { useContext } from "react";
import UserForm from "../components/UserForm";
import { ScenarioContext } from "../store/scenario-context";

const Form = () => {
const {addExcuse} = useContext(ScenarioContext)

  return <UserForm onFormSubmit={addExcuse} />;
};

export default Form;
