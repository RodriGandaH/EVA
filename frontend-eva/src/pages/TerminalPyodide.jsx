import { useState } from "react";
import { Button,Typography,Stack,Box } from "@mui/material";
import AceEditor from 'react-ace';

import { Pyodide } from "../pyodide";
function TerminalPyodide({ pyprompt, setPyprompt, pyoutput, setPyoutput }) {
   // const [pyprompt, setPyprompt] = useState('print("hello world!"');
   // const [pyoutput, setPyoutput] = useState(null);
   const pyodide = Pyodide.getInstance();

   return (
      <>
         <Stack spacing={2}>
            <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
               <AceEditor
                  mode="python"
                  theme="monokai"
                  onChange={setPyprompt}
                  name="codigoEstudiante"
                  editorProps={{ $blockScrolling: true }}
                  height="12em"
                  width="100%"
                  setOptions={{
                     showLineNumbers: true,
                  }}
                  value={pyprompt}
                  />
            </Box>

            <Stack direction={'row'} spacing={3} justifyContent={'space-between'}>
               <Button variant="contained"
                  onClick={() => {
                     pyodide.setOutput((text) => {
                        setPyoutput(`${text} `);
                     });
                     // console.log("clicked", pyprompt);
                     
                     pyodide.run(pyprompt);
                  }}
                  >
                  Run
               </Button>
               <Button variant="contained" onClick={()=>setPyoutput('')}>
                  Clear
               </Button>
            </Stack>

            <Typography>Ouput:</Typography>
            <Box sx={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
               <AceEditor
                  mode="text"
                  theme="chrome"
                  name="outputWindow"
                  editorProps={{ $blockScrolling: true }}
                  height="10em"
                  width="100%"
                  setOptions={{
                     readOnly: true, // Hacer la salida de solo lectura
                     showLineNumbers: false,
                     highlightActiveLine: false,
                     highlightGutterLine: false,
                  }}
                  value={pyoutput}
                  
               />
            </Box>
         </Stack>
      </>
   );
}

export default TerminalPyodide