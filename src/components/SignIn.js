import React, { useContext } from "react";
import { ScenarioContext } from "../store/scenario-context";
import { AuthSign } from "./AuthSign";

const SignIn = () => {
  const {
    setUser,
    user,
    setScenariosList,
    getUserSpecificScenarios,
    signInWithEmailAndPassword,
  } = useContext(ScenarioContext);
  return (
    <div>
      <AuthSign
        setUser={setUser}
        getUserSpecificScenarios={getUserSpecificScenarios}
        setScenariosList={setScenariosList}
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        user={user}
      />
    </div>
  );
  return <div>SignUp</div>;
};

export default SignIn;
