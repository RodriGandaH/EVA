import { jsPython } from "jspython-interpreter"
import { Container,Stack,Box,Typography,Button,TextField } from "@mui/material"
import { useState } from "react"
function IterationExersise() {
   const [resStript, setResStript] = useState('');
   const [text, setText] = useState(``);
   const script2 = `
   def fibonacci(n):
    fib_sequence = []
    a, b = 0, 1
    for _ in range(n):
        fib_sequence.append(a)
        a, b = b, a + b
    return fib_sequence

   # Llamando a la función para obtener los primeros 10 números de Fibonacci
   sequence = fibonacci(10)
   print(sequence)  # Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
      
   `
   const script = 
   `
   nota = 85
   if nota >= 90:
      print("Tienes una A")
   elif nota >= 80:
      print("Tienes una B")
   elif nota >= 70:
      print("Tienes una C")
   elif nota >= 60:
      print("Tienes una D")
   else:
      print("Has suspendido")`

   const runScript = async ()=>{
      console.log("Script",text);
      return await jsPython().
       evaluate(text);
   }
   const handleChange=(e)=>{
      setText(e.target.value)
      console.log(text);
   }
  return (
    <Container>
      <Stack direction={'row'} spacing={5} width={'100%'}>
         <Box>
            <Typography>
               Explicacion teoria
            </Typography>
         </Box>
         <Stack spacing={3} width={'50%'}>
              <TextField  defaultValue={``} multiline onChange={(e)=>{handleChange(e)}}>
               
            </TextField>
            <Button variant="contained" onClick={()=>{console.log(runScript())}}>
               Correr
            </Button>
            <TextField>
               {resStript}
            </TextField>
         </Stack>
      </Stack>
    </Container>
  )
}

export default IterationExersise