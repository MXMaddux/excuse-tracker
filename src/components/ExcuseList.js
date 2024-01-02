import React, { useContext, useState } from "react";
import { ScenarioContext } from "../store/scenario-context";
import { AuthContext } from "../store/auth-context";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import styled from "styled-components";

const ExcuseList = ({ scenario }) => {
  const {
    deleteExcuse,
    // ... other states from ScenarioContext ...
  } = useContext(ScenarioContext);

  const [currentEditingExcuse, setCurrentEditingExcuse] = useState(null);
  const [editableExcuse, setEditableExcuse] = useState({
    excuseUsed: "",
    dateUsed: "",
    givenTo: "",
  });

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
                {currentEditingExcuse &&
                currentEditingExcuse.id === excuse.id ? (
                  <div className="excuse-date-given">
                    <input
                      type="text"
                      value={editableExcuse.excuseUsed}
                      onChange={(e) =>
                        setEditableExcuse({
                          ...editableExcuse,
                          excuseUsed: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editableExcuse.dateUsed}
                      onChange={(e) =>
                        setEditableExcuse({
                          ...editableExcuse,
                          dateUsed: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editableExcuse.givenTo}
                      onChange={(e) =>
                        setEditableExcuse({
                          ...editableExcuse,
                          givenTo: e.target.value,
                        })
                      }
                    />
                    {/* Add save and cancel buttons if needed */}
                  </div>
                ) : (
                  <div className="excuse-date-given">
                    <p className="excuse-used">
                      Excuse Used: <span>{excuse.excuseUsed}</span>
                    </p>
                    <p className="date-used">
                      Date Used: <span>{excuse.dateUsed}</span>
                    </p>
                    <p className="given-to">
                      Given To: <span>{excuse.givenTo}</span>
                    </p>
                    <div className="icon-div">
                      <div className="trash">
                        <FaTrashAlt onClick={() => deleteExcuse(scenario.id)} />
                      </div>
                      <div className="edit">
                        <FaEdit
                          onClick={() => {
                            setCurrentEditingExcuse(excuse);
                            setEditableExcuse({
                              excuseUsed: excuse.excuseUsed,
                              dateUsed: excuse.dateUsed,
                              givenTo: excuse.givenTo,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
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
  width: 100%;

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

  .edit {
    color: var(--clr-secondary-4);
  }

  .edit:hover {
    color: var(--clr-secondary-5);
    cursor: pointer;
  }

  .excuse-date-given {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 0.75rem;
  }

  h5 {
    color: var(--clr-primary-2);
    text-transform: uppercase;
  }
  .excuse {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: left;
    background-color: var(--clr-primary-10);
    padding: 0 0.75rem;
    border-bottom: 1px solid var(--clr-primary-6);
  }

  .excuse-used,
  .date-used,
  .given-to {
    color: var(--clr-primary-3);
    text-transform: capitalize;
  }

  .excuse-used span,
  .date-used span,
  .given-to span {
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

  .icon-div {
    display: flex;
    gap: 8px;
  }

  input {
    width: 20rem;
    border: medium;
    background-color: var(--clr-white);
    border: 1px solid var(--clr-primary-4);
    margin-bottom: 0.5rem;
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
    background-color: var(--clr-primary-10);
    padding-top: 5px;
    display: flex;
    justify-content: start;
    padding: 0 0.75rem;
  }

  .trash {
    color: var(--clr-primary-4);
  }

  .trash:hover {
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
  }

  @media (max-width: 1092px) {
    .excuse {
      display: flex;
      flex-direction: column;
      justify-content: start;
    }
  }
`;
