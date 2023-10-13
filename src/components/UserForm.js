import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScenarioContext } from "../store/scenario-context";
import { AuthContext } from "../store/auth-context";
import styled from "styled-components";

const UserForm = () => {
  const { scenarios, addExcuseToScenario, formData, setFormData, onSubmitScenario, addScenario, setNewScenario, setExcuseUsed, setDateUsed, setGivenTo } =
    useContext(ScenarioContext);

  const { user } = useContext(AuthContext);

  const formRef = useRef();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
    navigate("/scenarios"); // Navigate after form submission
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { scenario, excuseUsed, dateUsed, givenTo } = formData;
    console.log("FORM DATA USERFORM 35: ", formData);

    const existingScenario = scenarios.find(
      (s) => s.scenario.toLowerCase() === scenario.toLowerCase()
    );

    if (existingScenario) {
      console.log("Existing Scenario ID: ", existingScenario.id);
      await addExcuseToScenario(existingScenario.id);
    } else {
      addScenario()
      console.error("Scenario not found.");
    }

    setFormData({
      scenario: "",
      excuseUsed: "",
      dateUsed: "",
      givenTo: "",
    });

    navigate("/scenarios");
  };

  if (!user) {
    return (
      <Wrapper>
        <div className="container">
          <p>Please sign in or register first.</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container">
    <p>Welcome, {user.email}</p>
        <form onSubmit={onSubmitScenario} name="scenario-form" ref={formRef}>
        
        <div className="sections">
            <label className="label">Scenario:</label>
            <input
            type="text"
            onChange={(e) => setNewScenario(e.target.value)}
            name="scenario"
          />
          </div>
          <div className="sections">
            <label>Excuse Used:</label>
            <input
            type="text"
            onChange={(e) => setExcuseUsed(e.target.value)}
            name="excuseUsed"
          />
          </div>
          <div className="sections">
            <label>Date Used:</label>
            <input
            type="date"
            onChange={(e) => setDateUsed(e.target.value)}
            name="dateUsed"
          />
          </div>
          <div className="sections">
            <label>Given To:</label>
            <input
            type="text"
            onChange={(e) => setGivenTo(e.target.value)}
            name="givenTo"
          />
          
        </div>
          <button className="btn btn-submit" type="submit">Submit</button>
      </form>
      </div>
    </Wrapper>
  );
};

export default UserForm;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .btn-submit {
    width: 100%;
    margin-top: 20px;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 330px;
  }

  .label {
    margin-right: 20px;
  }

  .sections {
    width: 300px;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
`;
