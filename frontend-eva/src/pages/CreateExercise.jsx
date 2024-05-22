import TextEditor from "../components/TextEditor"
import TerminalPyodide from "./TerminalPyodide"
import { TextareaAutosize,Container,Typography,Stack,Box } from "@mui/material"
function CreateExercise() {
  return (
    <Container>
      <Stack spacing={2}>
         <Typography variant="h4">
            Crear Ejercicio
         </Typography>
         <Box>
            <Typography variant="h5">
               Descripcion
            </Typography>
            <TextEditor />
         </Box>
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
      </Stack>
    </Container>
  )
}

export default CreateExercise