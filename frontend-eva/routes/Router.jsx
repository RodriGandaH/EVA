import { Routes,Route } from "react-router-dom";
import Home from "./../src/components/Home"
import Print from "./../src/components/Print"
import Exercise from "./../src/components/Exercise";
import If from "./../src/components/If";
import TestPage from "../src/pages/TestPage";
import IterationExercise from "../src/pages/IterationExercise";
import TerminalPyodide from "../src/pages/TerminalPyodide";
import CreateExercise from "../src/pages/CreateExercise"
function Router() {
  return (
     <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/basico" element={<Print />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/if" element={<If />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="iteration_excercise" element = {<IterationExercise/>}/>
        <Route path="/terminal" element = {<TerminalPyodide/>}/>
        <Route path="/create_exercise" element = {<CreateExercise/>}/>
     </Routes>
  )
}

export default Router