import React, { useContext, useState } from "react";
import { ScenarioContext } from "../store/scenario-context";
import { AuthContext } from "../store/auth-context";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { MdOutlineSaveAlt, MdOutlineCancel } from "react-icons/md";

import styled from "styled-components";

// Main component for displaying the list of excuses
const ExcuseList = ({ scenario }) => {
  const { deleteExcuse, updateExcuse, setIsEditing } =
    useContext(ScenarioContext);
  const [editingExcuseIndex, setEditingExcuseIndex] = useState(null);

  const excuses = scenario?.excuses || [];
  const { user } = useContext(AuthContext);

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!user) {
    return <p>Please sign in or register first.</p>;
  }

  const handleEditClick = (index) => {
    setEditingExcuseIndex(index);
  };

  const handleUpdateExcuse = (index, updatedExcuse) => {
    updateExcuse(scenario.id, index, updatedExcuse);
    setEditingExcuseIndex(null); // Reset editing index after update
  };

  return (
    <Wrapper>
      <div className="excuse-wrapper">
        {excuses.length > 0 ? (
          excuses.map((excuse, index) => (
            <ExcuseItem
              key={index}
              excuse={excuse}
              isEditing={editingExcuseIndex === index}
              onEditClick={() => handleEditClick(index)}
              onUpdateExcuse={(updatedExcuse) =>
                handleUpdateExcuse(index, updatedExcuse)
              }
              onDeleteClick={() => deleteExcuse(scenario.id, index)}
            />
          ))
        ) : (
          <p>No excuses available.</p>
        )}
      </div>
    </Wrapper>
  );
};

// Component to render each individual excuse
const ExcuseItem = ({
  excuse,
  isEditing,
  onEditClick,
  onUpdateExcuse,
  onDeleteClick,
  handleCancel,
}) => {
  const [editableExcuse, setEditableExcuse] = useState({ ...excuse });

  const handleUpdatedExcuseSubmit = (e) => {
    e.preventDefault();
    onUpdateExcuse(editableExcuse);
  };

  return (
    // <Wrapper>
    <div className="excuse">
      {isEditing ? (
        <form onSubmit={handleUpdatedExcuseSubmit}>
          <div className="excuse-editable">
            <div className="inputs">
              <label>
                <p>Excuse Used: </p>
              </label>
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
            </div>
            <div className="inputs">
              <label>
                <p>Date Used: </p>
              </label>
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
            </div>
            <div className="inputs">
              <label>
                <p>Given To: </p>
              </label>
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
            </div>
            {/* Similar inputs for dateUsed and givenTo */}
            <div className="button-div">
              <button className="save-cancel-btn btn-save" type="submit">
                <MdOutlineSaveAlt />
              </button>
              <button
                className="save-cancel-btn btn-cancel"
                onClick={handleCancel}
              >
                <MdOutlineCancel />
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="excuse-details">
          <p>
            Excuse Used: <span>{excuse.excuseUsed}</span>
          </p>
          <p>
            Date Used: <span>{excuse.dateUsed}</span>
          </p>
          <p>
            Given To: <span>{excuse.givenTo}</span>
          </p>
          <div className="trash-div">
            <button className="trash-icon">
              <FaTrashAlt onClick={onDeleteClick} />
            </button>
            <button className="save-icon">
              <FaEdit onClick={onEditClick} />
            </button>
          </div>
        </div>
      )}
    </div>
    // </Wrapper>
  );
};

export default ExcuseList;

const Wrapper = styled.section`
  display: flex;
  width: 100%;

  .btn-save {
    margin-right: 0.5rem;
    color: var(--clr-green-dark);
  }

  .btn-save:hover {
    color: var(--clr-green-light);
    cursor: pointer;
  }

  .btn-cancel {
    color: var(--clr-secondary-5);
  }

  .btn-cancel:hover {
    color: var(--clr-secondary-4);
    cursor: pointer;
  }

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

  .excuse-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
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
    width: 100%;
    align-items: start;
    padding: 1rem 0.5rem;
  }

  .excuse-details {
    width: 60%;
    text-align: center;
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

  .inputs {
    display: flex;
    gap: 0.5rem;
  }

  p {
    color: var(--clr-primary-2);
    font-size: 1rem;
    margin-bottom: 5px;
  }
  p span {
    margin-left: 5px;
  }

  .save-cancel-btn {
    border: none;
    font-size: 1.25rem;
    background-color: var(--clr-primary-10);
  }

  .save-icon {
    border: none;
    font-size: large;
    color: var(--clr-secondary-4);
    margin-right: 0.5rem;
  }

  .save-icon:hover {
    color: var(--clr-secondary-5);
    cursor: pointer;
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

  .trash-icon {
    border: none;
    font-size: large;
    color: var(--clr-primary-4);
    margin-right: 0.5rem;
  }

  .trash-icon :hover {
    color: var(--clr-primary-5);
  }

  @media (max-width: 1092px) {
    .excuse {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;
