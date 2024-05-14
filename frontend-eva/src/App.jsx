import './App.css';
import Router from '../routes/Router';
import { BrowserRouter  } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        navigator.serviceWorker
            .register('/react-py-sw.js')
            .then((registration) =>
                console.log(
                    'Service Worker registration successful with scope: ',
                    registration
                )
            )
            .catch((err) => console.log('Service Worker registration failed: ', err))
    }, [])
    return (
        <>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </>
    );
}

export default App;
