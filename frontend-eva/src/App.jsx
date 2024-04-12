import './App.css';
import Exercise from './components/Exercise';
import Home from './components/Home';
import If from './components/If';

import Print from './components/Print';

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
                </Routes>
            </Router>
        </>
    );
}

export default App;
