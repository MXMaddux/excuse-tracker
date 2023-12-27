import React, { useEffect, useContext } from "react";
import ExcuseList from "./ExcuseList"; // Import ExcuseList
import styled from "styled-components";
import { ScenarioContext } from "../store/scenario-context";
import { AuthContext } from "../store/auth-context";
import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ScenarioList = ({ onAddExcuse }) => {
  const {
    getScenarioList,
    scenariosList,
    deleteScenario,
    setEditingScenarioId,
    updatedScenario,
    setUpdatedScenario,
    editingScenarioId,
    updateScenario,
    searchScenarios,
    setSearchTerm,
    searchTerm,
  } = useContext(ScenarioContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getScenarioList();
  }, []);

  if (!user) {
    return (
      <Wrapper>
        <div className="main-2">
          <p>Please Login or Signup First.</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="main">
        <div className="search">
          <form onSubmit={searchScenarios}>
            <input
              type="text"
              placeholder="Search Scenarios"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch onClick={searchScenarios} className="fa-search" />
          </form>
        </div>
        {scenariosList.length > 0 ? (
          scenariosList.map((scenario, index) => {
            return (
              <div className="container-scenario" key={index}>
                <div className="scenario">
                  <p className="p">Scenario: </p>
                  <p className="p-scenario">
                    <span>{scenario.scenario}</span>
                  </p>
                  <div className="button-div">
                    <Link onClick={() => deleteScenario(scenario.id)}>
                      <FaTrashAlt className="icon-trash" />
                    </Link>
                    <Link onClick={() => setEditingScenarioId(scenario.id)}>
                      <FaEdit className="icon-edit" />
                    </Link>
                  </div>
                </div>
                {editingScenarioId === scenario.id && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateScenario(scenario.id, e);
                    }}
                  >
                    {console.log("Scenario ID: ", scenario.id)}
                    <input
                      type="text"
                      placeholder="Edit Scenario"
                      value={updatedScenario}
                      onChange={(e) => setUpdatedScenario(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                  </form>
                )}
                <ExcuseList
                  scenario={scenario} // Pass the entire scenario object
                  onAddExcuse={onAddExcuse}
                />
              </div>
            );
          })
        ) : (
          <Wrapper>
            <p>
              No scenarios added yet. Fill out the{" "}
              <span>
                <a href="/scenarioform">form</a>
              </span>
            </p>
          </Wrapper>
        )}
      </div>
    </Wrapper>
  );
};

export default ScenarioList;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  justify-content: center;
  align-items: center;

  a {
    color: var(--clr-primary-5);
    font-weight: bold;
  }
  a:hover {
    color: var(--clr-secondary-5);
    transition: var(--transition);
  }

  .container-scenario {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 100%;
    border-bottom: 3px solid var(--clr-secondary-2);
    justify-content: space-between;
  }

  .fa-search {
    color: var(--clr-primary-4);
    border: 2px solid black;
    border-left: none;
    height: 1.5rem;
    width: 1.5rem;
    background-color: white;
  }

  .fa-search:hover {
    cursor: pointer;
    color: var(--clr-secondary-4);
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h4 {
    color: var(--clr-primary-3);
    text-decoration: 3px underline var(--clr-secondary-4);
  }

  .icon-edit {
    color: var(--clr-secondary-4);
    font-size: large;
  }

  .icon-edit:hover {
    color: var(--clr-secondary-5);
  }

  .icon-trash {
    margin-right: 0.5rem;
    color: var(--clr-primary-4);
    font-size: large;
  }

  .icon-trash:hover {
    color: var(--clr-primary-5);
  }

  input {
    height: 24px;
    padding: 2px;
    border-right: none;
  }
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .main-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 129px);
  }

  .main-2 p {
    color: var(--clr-primary-2);
  }
  .no-scenarios {
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }

  .p {
    font-size: 1rem;
    font-weight: 700;
    color: var(--clr-secondary-5);
    text-transform: uppercase;
    text-decoration: underline;
    margin-top: 0.85rem;
  }

  .p-scenario {
    color: var(--clr-primary-7);
    font-size: 1rem;
    font-weight: 400;
    text-transform: capitalize;
    margin-top: 0.85rem;
  }

  .scenario {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    max-width: 1192px;
    color: var(--clr-primary-4);
    padding: 0 0.75rem;

    background-color: var(--clr-grey-10);
  }
  .scenario span {
    color: var(--clr-primary-3);
  }

  .search {
    display: flex;
    width: 80%;
    height: 100%;
    /* margin: auto; */
    justify-content: center;
    padding-bottom: 10px;
  }

  @media (max-width: 1092px) {
    .main {
      max-height: calc(100% - 7rem - 40px);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }
  }
  @media (max-width: 400px) {
    .main {
      width: 100vw;
    }
  }

  @media (max-width: 620px) {
    .search {
      width: 100%;
      padding-top: 10px;
    }

    .p-scenario {
      color: var(--clr-primary-7);
      font-size: 16px;
      text-transform: uppercase;
    }
  }
`;
