import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
    Container,
    Dialog,
    Alert,
} from '@mui/material';

function VariableEj3() {
    const [data, setData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let randomNumber = Math.floor(Math.random() * 9) + 1;
        const aA = randomNumber + 2;
        let randomNumber2 = Math.floor(Math.random() * 9) + 1;
        const bB = randomNumber2 + 2;
        let cC;
        if (aA > bB) {
            cC = aA - bB;
          } else {
            cC = aA + bB;
          }
        const opciones = [`${aA}`, `${cC}`, `${bB}`, `Error`];
        opciones.sort(() => Math.random() - 0.5); // Mezcla aleatoria de opciones
        setData({
            pregunta: "¿Qué valor tomará la variable: aA?",
            codigo: `aA = ${aA}\nbB = ${bB}\nif aA > bB:  \n     aA= aA-bB\nelse:\n     aA=aA+bB`,
            opciones: opciones,
            respuesta_correcta: opciones.indexOf(`${cC}`), // Índice de la respuesta correcta en el arreglo de opciones
        });
    }, []);

    const handleOptionChange = (event) => {
        setSelectedOption(parseInt(event.target.value));
    };

    const handleNextClick = (event) => {
        if (selectedOption !== data.respuesta_correcta) {
            setOpen(true);
            event.preventDefault();
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container
            sx={{
                m: 2,
                maxWidth: '70%',
                margin: '0 auto',
            }}
        >
            {data && (
                <>
                    <Typography variant="h4" gutterBottom>
                        {data.pregunta}
                    </Typography>
                    <Box
                        component="pre"
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            p: 1,
                            borderRadius: 1,
                        }}
                    >
                        <code>{data.codigo}</code>
                    </Box>
                    <RadioGroup name="option" onChange={handleOptionChange}>
                        {data.opciones.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                value={index.toString()}
                                control={<Radio />}
                                label={option}
                            />
                        ))}
                    </RadioGroup>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            component={Link}
                            to="/variableEj2"
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outlined"
                            component={Link}
                            to="/if"
                            onClick={handleNextClick}
                        >
                            Siguiente
                        </Button>
                    </Box>
                    <Dialog open={open} onClose={handleClose}>
                        <Alert severity="error" onClose={handleClose}>
                            {'Respuesta incorrecta'}
                        </Alert>
                    </Dialog>
                </>
            )}
        </Container>
    );
}

export default VariableEj3;
