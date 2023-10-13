import React, { useContext } from "react";
import styled from "styled-components";
import { ScenarioContext } from "../store/scenario-context";
const ExcuseList = ({ scenario }) => {
  const { deleteExcuse } = useContext(ScenarioContext);

  const excuses = scenario?.excuses || [];

  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          <h5>Past Excuses:</h5>
        </div>
        <div className="excuses">
          {excuses.length > 0 ? (
            excuses.map((excuse, index) => (
              <div className="excuse" key={index}>
                <p className="excuse-used">
                  Excuse Used: <span>{excuse.excuseUsed}</span>
                </p>

                <p className="excuse-used">
                  Date Used: <span>{excuse.dateUsed}</span>
                </p>
                <p className="excuse-used">
                  Given To: <span>{excuse.givenTo}</span>
                </p>
                <button
                  className="btn btn-delete"
                  onClick={() => deleteExcuse(scenario.id)}
                >
                  Delete Excuse
                </button>
                
              </div>
            ))
          ) : (
            <p>No excuses available.</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ExcuseList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
  align-items: start;
  padding: 0px 30px 30px 40px;

  .btn-delete {
    width: 160px;
    margin-bottom: 1rem;
    background-color: var(--clr-secondary-3);
  }

  .btn-delete:hover {
    background-color: var(--clr-secondary-5);
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    padding: 0 40px;
  }

  h5 {
    color: var(--clr-primary-4);
  }
.excuse {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

  .excuse-used {
    color: var(--clr-primary-3);
    text-transform: capitalize;
  }

  .excuse-used span {
    color: var(--clr-secondary-4);
    margin-left: 2px;
    text-transform: capitalize;
    /* font-weight: bold; */
  }

  .excuses {

  }

  hr {
    height: 2px;
    background-color: var(--clr-primary-4);
    border: none;
  }

  p {
    color: var(--clr-primary-2);
    font-size: 13px;
    margin-bottom: 5px;
  }
  p span {
    margin-left: 5px;
  }

  @media (max-width: 400px) {
    
  }
`;
