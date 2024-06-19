import './App.css';
import Router from '../routes/Router';
import { BrowserRouter  } from 'react-router-dom';
import ScormProvider from 'react-scorm-provider';

function App() {
    return (
        <>
            <ScormProvider version="1.2" debug={process.env.NODE_ENV !== 'production'}>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </ScormProvider>
        </>
    );
}

export default App;
