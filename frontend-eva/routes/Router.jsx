import { Routes,Route,Navigate } from "react-router-dom";
import Home from "./../src/components/Home"
import Print from "./../src/components/Print"
import Exercise from "./../src/components/Exercise";
import If from "./../src/components/If";
import TestPage from "../src/pages/TestPage";
import IterationExercise from "../src/pages/IterationExercise";
import TerminalPyodide from "../src/pages/TerminalPyodide";
import CreateExercise from "../src/pages/CreateExercise"
import CrearEjercicios from '../src/components/CrearEjercicios';
import Ejercicios from '../src/components/Ejercicios';
import CongratilationPage from "../src/pages/CongratilationPage";
function Router() {
  return (
     <Routes>
        <Route  path="/" element={<Navigate to="/home" replace/>}  />
        <Route path="/home" element={<Home/>} />
        <Route path="/basico" element={<Print />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/if" element={<If />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="iteration_excercise" element = {<IterationExercise/>}/>
        <Route path="/terminal" element = {<TerminalPyodide/>}/>
        <Route path="/create_exercise" element = {<CreateExercise/>}/>
        <Route path="crear-ejercicios" element={<CrearEjercicios />} />
        <Route path="/ejercicios" element={<Ejercicios />} />
        <Route path="/curso-terminado" element={<CongratilationPage/>}/>
     </Routes>
  )
}

export default Router;
