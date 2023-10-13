import "../../src/index.css";
import { db } from "../config/firebase";
import { useEffect, useState, createContext, useRef, useContext } from "react";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";

export const ScenarioContext = createContext();

export const ScenarioProvider = ({ children }) => {
  const [scenariosList, setScenariosList] = useState([]);
  const [newScenario, setNewScenario] = useState("");
  const [excuseUsed, setExcuseUsed] = useState("");
  const [dateUsed, setDateUsed] = useState("");
  const [givenTo, setGivenTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatedScenario, setUpdatedScenario] = useState("");
  const [updatedExcuses, setUpdatedExcuses] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingScenarioId, setEditingScenarioId] = useState(null);

  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const scenariosCollectionRef = user
    ? collection(db, `users/${user.uid}/scenarios`)
    : null;

  const formRef = useRef();

  const getScenarioList = async () => {
    if (user) {
      try {
        const data = await getDocs(scenariosCollectionRef);
        console.log("DATA context line 45: ", data);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("filtered DATA context line 51: ", filteredData);
        setScenariosList(filteredData);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getUserSpecificScenarios = async () => {
    if (user) {
      try {
        const userSpecificScenariosRef = collection(
          db,
          `users/${user.uid}/scenarios`
        );
        const data = await getDocs(userSpecificScenariosRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setScenariosList(filteredData);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getScenarioList();
    if (user) {
      getUserSpecificScenarios();
    }
  }, [user]);

  const onSubmitScenario = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        console.error("User not authenticated.");
        return;
      }

      const lowerCaseScenario = newScenario.toLowerCase();

      await getUserSpecificScenarios();

      const existingScenario = scenariosList.find(
        (scenario) => scenario.scenario.toLowerCase() === lowerCaseScenario
      );
      console.log("Existing Scenario: ", existingScenario);

      if (existingScenario) {
        await addExcuseToScenario(existingScenario.id);
      } else {
        const userSpecificScenariosRef = collection(
          db,
          `users/${user.uid}/scenarios`
        );
        await addDoc(userSpecificScenariosRef, {
          scenario: newScenario,
          excuses: [
            {
              excuseUsed: excuseUsed,
              dateUsed: dateUsed,
              givenTo: givenTo,
            },
          ],
        });
      }

      setNewScenario("");
      setExcuseUsed("");
      setDateUsed("");
      setGivenTo("");

      formRef.current.reset();

      getUserSpecificScenarios(); // Update the scenarios list for the current user
      navigate("/scenarios");
    } catch (error) {
      console.error(error);
    }
  };

  const updateScenario = async (id, e) => {
    e.preventDefault();
    const scenarioDoc = doc(db, "users", user.uid, "scenarios", id);
    try {
      await updateDoc(scenarioDoc, { scenario: updatedScenario });
      setIsEditing(false);
      setEditingScenarioId(null);
      getUserSpecificScenarios();

      // Reset the state values
      setUpdatedScenario("");
      setNewScenario("");
      setExcuseUsed("");
      setDateUsed("");
      setGivenTo("");
    } catch (error) {
      console.error("Error updating scenario:", error);
    }
  };

  const deleteScenario = async (id) => {
    try {
      if (user) {
        const scenarioDoc = doc(db, `users/${user.uid}/scenarios`, id);
        await deleteDoc(scenarioDoc);
        getScenarioList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExcuse = async (scenarioId, excuseIndex) => {
    try {
      const scenario = scenariosList.find((s) => s.id === scenarioId);

      if (scenario) {
        const updatedExcuses = [...scenario.excuses];
        updatedExcuses.splice(excuseIndex, 1);

        await updateDoc(doc(scenariosCollectionRef, scenario.id), {
          excuses: updatedExcuses,
        });

        getScenarioList();
      } else {
        console.error(`Scenario with ID ${scenarioId} not found`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addExcuseToScenario = async (scenarioId) => {
    console.log("ScenarioID: ", scenarioId);
    try {
      const scenario = scenariosList.find((s) => s.id === scenarioId);

      if (scenario) {
        await updateDoc(doc(scenariosCollectionRef, scenario.id), {
          excuses: [
            ...scenario.excuses,
            {
              excuseUsed: excuseUsed,
              dateUsed: dateUsed,
              givenTo: givenTo,
            },
          ],
        });
        getScenarioList();

        setNewScenario("");
        setExcuseUsed("");
        setDateUsed("");
        setGivenTo("");

        navigate("/scenarios");
      } else {
        console.error(`Scenario with ID ${scenarioId} not found`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const searchScenarios = (e) => {
    e.preventDefault();

    const filteredScenarios = scenariosList.filter((scenario) =>
      scenario.scenario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setScenariosList(filteredScenarios);
    setSearchTerm("");
  };

  const updateExcuse = async (scenarioId, excuseIndex, updatedExcuse) => {
    try {
      const scenario = scenariosList.find((s) => s.id === scenarioId);

      if (scenario) {
        const updatedExcuses = [...scenario.excuses];
        updatedExcuses[excuseIndex] = updatedExcuse;

        await updateDoc(doc(scenariosCollectionRef, scenario.id), {
          excuses: updatedExcuses,
        });

        getScenarioList();
      } else {
        console.error(`Scenario with ID ${scenarioId} not found`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScenarioContext.Provider
      value={{
        getScenarioList,
        onSubmitScenario,
        updateScenario,
        deleteExcuse,
        addExcuseToScenario,
        getUserSpecificScenarios,
        searchScenarios,
        user,
        setUser,
        scenariosList,
        setScenariosList,
        newScenario,
        setNewScenario,
        excuseUsed,
        setExcuseUsed,
        dateUsed,
        setDateUsed,
        givenTo,
        setGivenTo,
        searchTerm,
        setSearchTerm,
        updatedScenario,
        setUpdatedScenario,
        updatedExcuses,
        setUpdatedExcuses,
        deleteScenario,
        updateExcuse,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
