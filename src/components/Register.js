import React, { useContext } from "react";
import { ScenarioContext } from "../store/scenario-context";
import { AuthReg } from "./AuthReg";

const Register = () => {
  const {
    setUser,
    user,
    setScenariosList,
    getUserSpecificScenarios,
    signInWithEmailAndPassword,
  } = useContext(ScenarioContext);
  return (
    <div>
      <AuthReg
        setUser={setUser}
        getUserSpecificScenarios={getUserSpecificScenarios}
        setScenariosList={setScenariosList}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        user={user}
      />
    </div>
  );
};

export default Register;
