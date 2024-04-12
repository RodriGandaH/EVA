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
        fetch('http://127.0.0.1:8000/api/ejercicio-print')
            .then((response) => response.json())
            .then((data) => setData(data));
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
                                value={option}
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
                            to="/basico"
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
