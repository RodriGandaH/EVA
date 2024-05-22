import { useState } from "react";
import { Button,TextareaAutosize,TextField,Typography,Box } from "@mui/material";
// import "./App.css";

import { Pyodide } from "../pyodide";
function TerminalPyodide() {
   const [pyprompt, setPyprompt] = useState('print("hello world!"');
   const [pyoutput, setPyoutput] = useState(null);
   const pyodide = Pyodide.getInstance();

   return (
      <>
         {/* <Typography variant="h4">Interprete de  Python</Typography> */}
         <Box>
            <TextareaAutosize
               style={{
                  width: "100%",
                  height: "200px",
                  fontFamily: "monospace",
                  fontSize: "1rem",
               }}
               value={pyprompt}
               onChange={(e) => {
                  setPyprompt(e.target.value);
                  // console.log(e.target.value);
               }}
            ></TextareaAutosize>

            <Button variant="contained"
               onClick={() => {
                  pyodide.setOutput((text) => {
                     setPyoutput(text);
                  });
                  // console.log("clicked", pyprompt);

                  pyodide.run(pyprompt);
               }}
            >
               Run
            </Button>

            <Typography>Ouput:</Typography>
            <code style={{
               width: "100%",
               height: "200px",
               fontFamily: "monospace",
               fontSize: "1rem",
            }}>{pyoutput}</code>
            {/* <TextareaAutosize style={{
               width: "100%",
               height: "200px",
               fontFamily: "monospace",
               fontSize: "1rem",
            }}
            value={pyoutput}>

            </TextareaAutosize> */}
           

         </Box>
      </>
   );
}

export default TerminalPyodide