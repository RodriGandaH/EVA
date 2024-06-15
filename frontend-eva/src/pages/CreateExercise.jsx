import TextEditor from "../components/TextEditor"
import TerminalPyodide from "./TerminalPyodide"
import { TextareaAutosize,Container,Typography,Stack,Box,Button } from "@mui/material"
function CreateExercise() {
  return (
    <Container>
         <Typography variant="h4">
            Crear Ejercicio
         </Typography>
      <Stack spacing={2} direction={'row'}>
         <Box>
            <Typography variant="h5">
               Descripcion
            </Typography>
            {/* <Box width={'70%'}> */}
               <TextEditor />
            {/* </Box> */}
         </Box>
         <Stack spacing={2}>
            <Box>
               <Typography variant="h5">
                  Ejercicio
               </Typography>
               <TerminalPyodide/>
            </Box>
            <Box>
               <Typography variant="h5">
                  Vista  del Estudiante
               </Typography>
               <TextareaAutosize style={{
                  width: "100%",
                  height: "200px",
                  fontFamily: "monospace",
                  fontSize: "1rem",
               }} />
            </Box>
         <Button variant="contained">
            Registrar
         </Button>
         </Stack>
      </Stack>
    </Container>
  )
}

export default CreateExercise