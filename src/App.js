import "./index.css";
import { useContext } from "react";
import { ScenarioContext } from "./store/scenario-context";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Scenarios from "./pages/Scenarios";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Form from "./pages/Form";

function App() {
  const { addExcuse, addExcuseToScenario } = useContext(ScenarioContext);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="scenarioform" element={<Form onFormSubmit={addExcuse} />} />
        <Route
          path="scenarios"
          element={<Scenarios onAddExcuse={addExcuseToScenario} />}
        />
        <Route path="/" element={<Hero />} />
        <Route path="signup" element={<Signup />} />
        <Route path="scenarios" element={<Scenarios />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;




