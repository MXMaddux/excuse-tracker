import React, {useContext} from 'react'
import { ScenarioContext } from '../store/scenario-context'
import { Auth } from './auth'

const Signup = () => {
    const {setUser, user, setScenariosList, getUserSpecificScenarios, signInWithEmailAndPassword, onSubmitScenario, setNewScenario, newScenario, setExcuseUsed, excuseUsed, dateUsed, givenTo, setDateUsed, setGivenTo} = useContext(ScenarioContext)
  return (
    <div>

    <Auth setUser={setUser} getUserSpecificScenarios={getUserSpecificScenarios} setScenariosList={setScenariosList} signInWithEmailAndPassword={signInWithEmailAndPassword} user={user}/>

      {/* {user && (
        <div>
        <form onSubmit={onSubmitScenario}>
          <input
            type="text"
            placeholder="Scenario"
            onChange={(e) => setNewScenario(e.target.value)}
            value={newScenario}
          />
          <input
            type="text"
            placeholder="Excuse Used"
            onChange={(e) => setExcuseUsed(e.target.value)}
            value={excuseUsed}
          />
          <input
            type="date"
            placeholder="Date Used"
            onChange={(e) => setDateUsed(e.target.value)}
            value={dateUsed}
          />
          <input
            type="text"
            placeholder="Given To"
            onChange={(e) => setGivenTo(e.target.value)}
            value={givenTo}
          />
          </form>
          <button type="submit" onClick={onSubmitScenario}>
            Submit
          </button>
        </div>
      )} */}
    </div>
  )
}

export default Signup