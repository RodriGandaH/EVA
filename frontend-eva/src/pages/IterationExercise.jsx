import { jsPython } from 'jspython-interpreter';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import {
    Container,
    Stack,
    Box,
    Typography,
    Button,
    TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';

function IterationExersise() {
    const [resStript, setResStript] = useState('');
    const [text, setText] = useState(``);
    const [isError, setIsError] = useState(false);

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
      
   `;
    const script = `
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
      print("Has suspendido")`;

    useEffect(() => {
        console.log(resStript);
    }, [resStript]);

    const runScript = async () => {
        const fullScript = text + '\nprint(res)';
        try {
            const result = await jsPython().evaluate(fullScript);
            setResStript(result);
            setIsError(false);
        } catch (error) {
            setResStript(error.message);
            setIsError(true);
        }
    };

    const handleChange = (newCode) => {
        setText(newCode);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Iteraciones en Python
            </Typography>
            <Stack
                direction={'row'}
                spacing={5}
                width={'100%'}
                justifyContent={'space-between'}
            >
                <Box width={'50%'}>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed non risus. Suspendisse lectus tortor, dignissim sit
                        amet, adipiscing nec, ultricies sed, dolor. Cras
                        elementum ultrices diam. Maecenas ligula massa, varius
                        a, semper congue, euismod non, mi. Proin porttitor, orci
                        nec nonummy molestie, enim est eleifend mi, non
                        fermentum diam nisl sit amet erat. Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit. Sed non risus.
                        Suspendisse lectus tortor, dignissim sit amet,
                        adipiscing nec, ultricies sed, dolor. Cras elementum
                        ultrices diam. Maecenas ligula massa, varius a, semper
                        congue, euismod non, mi. Proin porttitor, orci nec
                        nonummy molestie, enim est eleifend mi, non fermentum
                        diam nisl sit amet erat.
                    </Typography>
                </Box>
                <Stack spacing={3} width={'50%'}>
                    <AceEditor
                        mode="python"
                        theme="monokai"
                        onChange={handleChange}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        height="12em"
                        width="100%"
                        setOptions={{
                            showLineNumbers: true,
                        }}
                        value={text}
                    />
                    <Button
                        variant="contained"
                        onClick={() => {
                            runScript();
                        }}
                    >
                        Correr
                    </Button>
                    <TextField
                        multiline
                        minRows={3}
                        value={resStript}
                        error={isError}
                        InputProps={{
                            style: { color: isError ? 'red' : 'black' },
                        }}
                    ></TextField>
                </Stack>
            </Stack>
        </Container>
    );
}

export default IterationExersise;
