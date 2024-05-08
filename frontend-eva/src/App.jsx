import './App.css';
import Router from '../routes/Router';

import Print from './components/Print';

import { BrowserRouter  } from 'react-router-dom';

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
