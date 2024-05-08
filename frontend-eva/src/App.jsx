import './App.css';
import Exercise from './components/Exercise';
import Home from './components/Home';
import If from './components/If';

import Print from './components/Print';

import Variable from './components/Variable';
import VariableEj from './components/VariableEj';
import VariableEj2 from './components/VariableEj2';
import VariableEj3 from './components/VariableEj3';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/basico" element={<Print />} />
                    <Route path="/exercise" element={<Exercise />} />
                    <Route path="/if" element={<If />} />
                    <Route path="/variable" element={<Variable />} />
                    <Route path="/variableEj" element={<VariableEj />} />
                    <Route path="/variableEj2" element={<VariableEj2 />} />
                    <Route path="/variableEj3" element={<VariableEj3 />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
