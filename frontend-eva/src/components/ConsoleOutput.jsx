import { TextField } from '@mui/material';
import  { useEffect, useState } from 'react';

const ConsoleOutput = () => {
   const [consoleMessages, setConsoleMessages] = useState([]);

   useEffect(() => {
      const consoleListener = (event) => {
         setConsoleMessages(prevMessages => [...prevMessages, event]);
      };

      window.addEventListener('message', consoleListener);

      return () => {
         window.removeEventListener('message', consoleListener);
      };
   }, []);

   return (
      <TextField>
         {consoleMessages.map((message, index) => (
            <div key={index}>{message.data}</div>
         ))}
      </TextField>
   );
};

export default ConsoleOutput;