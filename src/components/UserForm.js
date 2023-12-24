import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ScenarioContext } from "../store/scenario-context";
import { AuthContext } from "../store/auth-context";
import styled from "styled-components";

const UserForm = () => {
  const {
    onSubmitScenario,
    setNewScenario,
    setExcuseUsed,
    setDateUsed,
    setGivenTo,
    errors,
    formRef,
  } = useContext(ScenarioContext);

  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Wrapper>
        <div className="container-no-user">
          <p>Please sign in or register first.</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        <p>
          Welcome,
          <span className="span-welcome"> {user.email}</span>
        </p>
        <form onSubmit={onSubmitScenario} name="scenario-form" ref={formRef}>
          <div className="sections">
            <label className="label">Scenario:</label>
            <input
              type="text"
              onChange={(e) => setNewScenario(e.target.value)}
              name="scenario"
            />
          </div>
          <div className="error-message">{errors.scenario}</div>
          <div className="sections">
            <label>Excuse Used:</label>
            <input
              type="text"
              onChange={(e) => setExcuseUsed(e.target.value)}
              name="excuseUsed"
            />
          </div>
          <div className="error-message">{errors.excuseUsed}</div>
          <div className="sections">
            <label>Date Used:</label>
            <input
              type="date"
              onChange={(e) => setDateUsed(e.target.value)}
              name="dateUsed"
            />
          </div>
          <div className="error-message">{errors.dateUsed}</div>
          <div className="sections">
            <label>Given To:</label>
            <input
              type="text"
              onChange={(e) => setGivenTo(e.target.value)}
              name="givenTo"
            />
          </div>
          <div className="error-message">{errors.givenTo}</div>
          <button className="btn btn-submit" type="submit">
            Submit
          </button>
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
  height: calc(100vh - 129px);
  justify-content: center;
  align-items: center;

  .btn-submit {
    width: 100%;
    margin-top: 20px;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 330px;
    height: 100%;
  }

  .container-no-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 330px;
    height: 100%;
  }

  .error-message {
    color: var(--clr-red-dark);
  }

  .label {
    margin-right: 20px;
  }

  .sections {
    /* width: 300px; */
    height: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .span-welcome {
    text-transform: uppercase;
    color: var(--clr-secondary-4);
  }
`;
