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

function Exercise() {
    const [data, setData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let randomNumber = Math.floor(Math.random() * 9) + 1;
        const aA = randomNumber + 1;
        let randomNumber2 = Math.floor(Math.random() * 9) + 1;
        const AA = randomNumber2 + aA;
        let randomNumber3 = Math.floor(Math.random() * 9) + 1;
        const Aa = randomNumber3 + AA;
        const opciones = [`${Aa}`-1, `${Aa}`, `${AA}`, `${aA}`];
        opciones.sort(() => Math.random() - 0.5); // Mezcla aleatoria de opciones
        setData({
            pregunta: "¿Qué valor tomará la variable: Aa?",
            codigo: `Aa = ${randomNumber}\naA = ${randomNumber2} + 1\nAA = ${randomNumber3} + aA\nAa = Aa + AA`,
            opciones: opciones,
            respuesta_correcta: opciones.indexOf(`${Aa}`), // Índice de la respuesta correcta en el arreglo de opciones
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
                            to="/variable"
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

export default Exercise;
