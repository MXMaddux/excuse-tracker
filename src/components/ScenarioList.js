import React, { useEffect, useContext } from "react";
import ExcuseList from "./ExcuseList"; // Import ExcuseList
import styled from "styled-components";
import { ScenarioContext } from "../store/scenario-context";
import { AuthContext } from "../store/auth-context";

const ScenarioList = ({ onAddExcuse }) => {
  const {
    getScenarioList,
    scenarios,
    scenariosList,
    deleteScenario,
    setEditingScenarioId,
    updatedScenario,
    setUpdatedScenario,
    editingScenarioId,
    updateScenario,
    deleteExcuse,
    searchScenarios,
    setSearchTerm,
    searchTerm
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
        <button className="btn btn-search" type="submit"onClick={searchScenarios}>Search</button>
        </form>
      </div>
        {scenariosList.map((scenario, index) => {
          return (
            <div className="container-scenario" key={index}>
              <div className="scenario">
                <h4>Scenario: </h4>
                <p className="p-scenario">
                  <span>{scenario.scenario}</span>
                </p>
                <button
                  className="btn btn-delete-scenario"
                  onClick={() => deleteScenario(scenario.id)}
                >
                  Delete Scenario
                </button>
                <button onClick={() => {
                  console.log(`Editing scenario with id of ${scenario.id}`)
                  setEditingScenarioId(scenario.id);
                }}></button>
                <button  className="btn btn-edit-scenario" onClick={() => setEditingScenarioId(scenario.id)}>
                  Edit Scenario
                </button>
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
        })}
      </div>
    </Wrapper>
  );
};

export default ScenarioList;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 79 - 40);
  /* height: 100%; */
  padding: 3rem;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;

  .btn-delete-scenario {
    width: 160px;
    background-color: var(--clr-primary-3);
    margin-bottom: 5px;
  }

  .btn-delete-scenario:hover {
    background-color: var(--clr-primary-5);
    transition: var(--transition);
  }
  .btn-edit-scenario {
    width: 160px;
    background-color: var(--clr-primary-2);
  }

  .btn-edit-scenario:hover {
    background-color: var(--clr-secondary-3);
    transition: var(--transition);
  }

  .btn-search {
    width: 160px;
    margin-left: 20px;
  }

  .btn-search:hover {
    background-color: var(--clr-secondary-5);
    transition: var(--transition);
  }

  .container-scenario {
    display: flex;
    width: 80%;
    border-bottom: 3px solid var(--clr-secondary-2);
    justify-content: center;
    padding: 0 40px;
  }

  h4 {
    color: var(--clr-primary-3);
    text-decoration: 3px underline var(--clr-secondary-4);
  }
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: space-around;
    align-items: center;
  }

  .main-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100vh;
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

  .p-scenario {
    color: var(--clr-primary-7);
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .scenario {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 40px; */
    width: 50%;
    margin: 0 auto;
    padding: 20px 40px 40px 40px;
    color: var(--clr-primary-4);
  }
  .scenario span {
    color: var(--clr-secondary-4);
  }

  .search {
    display: flex;
    width: 80%;
    margin: auto;
    border-bottom: 3px solid var(--clr-primary-2);
    justify-content: center;
    padding-bottom: 20px;
  }

  @media (max-width: 800px) {
    .main {
      max-height: calc(100% - 139px - 40px);
      display: flex;
      justify-content: center;
      align-items: center;
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
