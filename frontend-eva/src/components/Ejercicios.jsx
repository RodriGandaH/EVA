import React, { useState, useEffect } from 'react';
import { jsPython } from 'jspython-interpreter';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import { Container, Grid, Typography, Button, TextField,Stack,IconButton,CircularProgress ,Box} from '@mui/material';
import TerminalPyodide from '../pages/TerminalPyodide';
import { useNavigate } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
function Ejercicios() {
    const [pyprompt, setPyprompt] = useState('');
    const [pyoutput, setPyoutput] = useState(null);
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);
    const [ejercicioActual, setEjercicioActual] = useState(0);
    const [codigoEstudiante, setCodigoEstudiante] = useState('');
    const [resultadoEstudiante, setResultadoEstudiante] = useState('');
    const [isError, setIsError] = useState(false);
    const [resultadoDocente, setResultadoDocente] = useState('');
    const [puedeContinuar, setPuedeContinuar] = useState(false);

    const obtenerEjercicios = async () => {
        setFlag(true);
        const response = await fetch('http://localhost:8000/api/ejercicios');
        const data = await response.json();
        setEjercicios(data);
        setPyprompt(data[0].codigo_estudiante);
    };
    useEffect(() => {
        obtenerEjercicios();
    }, []);
    useEffect(() => {
      setFlag(false);
    }, [ejercicios])
    

    useEffect(() => {
        console.log('Resultado Estudiante', resultadoEstudiante);
        console.log('Resultado Docente', resultadoDocente);
    }, [resultadoEstudiante, resultadoDocente]);

    const runScriptEstudiante = async () => {
        const fullScript = codigoEstudiante + '\nprint(res)';
        try {
            const result = await jsPython().evaluate(fullScript);
            setResultadoEstudiante(result);
            setIsError(false);
            return result;
        } catch (error) {
            setResultadoEstudiante(error.message);
            setIsError(true);
            return error.message;
        }
    };

    const runScriptDocente = async () => {
        const fullScript =
            ejercicios[ejercicioActual].codigo_docente + '\nprint(res)';
        try {
            const result = await jsPython().evaluate(fullScript);
            setResultadoDocente(result);
            return result;
        } catch (error) {
            setResultadoDocente(error.message);
            return error.message;
        }
    };

    const handleRun = async () => {
        const resultadoEstudiante = await runScriptEstudiante();
        const resultadoDocente = await runScriptDocente();

        if (resultadoEstudiante === resultadoDocente) {
            setPuedeContinuar(true);
        }
    };

    const handleSiguiente = () => {
        const nextEjercicio = ejercicioActual + 1;
        setEjercicioActual(nextEjercicio);
        setCodigoEstudiante(ejercicios[nextEjercicio].codigo_estudiante);
        setPuedeContinuar(false);
        setResultadoEstudiante('');
    };



    return (
        <Container>
            {ejercicios.length == 0 ?
            <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center', // Centrado horizontal
                        alignItems: 'center', // Centrado vertical
                        backgroundColor: '#f0f0f0', // Color de fondo opcional
                    }}
            >
               { !flag ? <CircularProgress  size={50} /> : <Typography>No Hay Ejercicios creados</Typography>}
            </Box>
            :
            <>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant="h4" gutterBottom>
                        Ejercicios
                    </Typography>
                    <IconButton
                        sx={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            padding: 0,
                            backgroundColor: '#f0f0f0',
                            '&:hover': {
                                backgroundColor: '#e0e0e0',
                            },
                        }}
                        onClick={() => navigate('/home')}
                    >
                        <GoHomeFill size={25} />
                    </IconButton>
                </Stack>
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: ejercicios[ejercicioActual]?.descripcion }}>
                    
                </Typography>
                <TerminalPyodide pyprompt={pyprompt} setPyprompt={setPyprompt} pyoutput={pyoutput} setPyoutput={setPyoutput}/>
                <Grid container direction="column" spacing={2}>
                    <Grid item xs={12} container justifyContent="flex-end">
                        <Button
                            variant="contained"
                            disabled={ejercicioActual == ejercicios.length-1}
                            onClick={handleSiguiente}
                        >
                            Siguiente
                        </Button>
                    </Grid>
                </Grid>
            </>
            }
        </Container>
    );
}

export default Ejercicios;
