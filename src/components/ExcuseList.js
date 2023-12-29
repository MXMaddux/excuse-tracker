import React, { useContext } from "react";
import styled from "styled-components";
import { ScenarioContext } from "../store/scenario-context";
import { AuthContext } from "../store/auth-context";
import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExcuseList = ({ scenario }) => {
  const { deleteExcuse } = useContext(ScenarioContext);

  const excuses = scenario?.excuses || [];

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
    <Wrapper className="excuse-wrapper">
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
                <Link
                  onClick={() => deleteExcuse(scenario.id)}
                  className="delete-link"
                >
                  <FaTrashAlt />
                </Link>
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

const Wrapper = styled.section`
  display: flex;
  /* flex-direction: column; */
  width: 100%;
  /* justify-content: space-between; */

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .container-no-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 330px;
    height: 100%;
  }

  .delete-link {
    color: var(--clr-primary-4);
  }

  .delete-link:hover {
    color: var(--clr-primary-5);
  }

  h5 {
    color: var(--clr-primary-2);
    text-transform: uppercase;
  }
  .excuse {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--clr-secondary-10);
    padding: 0 0.75rem;
    border-bottom: 1px solid var(--clr-secondary-8);
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
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  hr {
    height: 2px;
    background-color: var(--clr-primary-1);
    border: none;
  }

  p {
    color: var(--clr-primary-2);
    font-size: 1rem;
    margin-bottom: 5px;
  }
  p span {
    margin-left: 5px;
  }

  .title {
    background-color: var(--clr-secondary-10);
    padding-top: 5px;
  }

  @media (max-width: 1092px) {
    .excuse {
      display: flex;
      flex-direction: column;
    }
  }
`;
