import React, { useState, useEffect } from 'react';
import { jsPython } from 'jspython-interpreter';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import { Container, Grid, Typography, Button, TextField, Stack, IconButton, CircularProgress, Box } from '@mui/material';
import TerminalPyodide from '../pages/TerminalPyodide';
import { useNavigate } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import SideBar from './SideBar';
import {
    ScormProcessInitialize,
    ScormProcessTerminate,
    ScormProcessGetValue,
    ScormProcessSetValue,
    ScormProcessCommit
} from '../../scorm-utils';

function Ejercicios() {
    const [scormData, setScormData] = useState({});
    const [courseData, setCourseData] = useState({});
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
    const [intentosFallidos, setIntentosFallidos] = useState(0); // Estado para contar los intentos fallidos

    // Función para procesar el código del estudiante y ocultar ayudas según los intentos fallidos
    useEffect(() => {
      obtenerEjercicios();
      ScormProcessInitialize();
      window.onload = handleBeforeUnload;
      window.onbeforeunload = handleBeforeUnload;
      const initialValues = {
        name : ScormProcessGetValue('cmi.learner_name',false),
        status : ScormProcessGetValue('cmi.completion_status', false),
        success: ScormProcessGetValue('cmi.success_status', false),
        score :  0,
        location : ScormProcessGetValue('cmi.location',false),
      }
        ScormProcessSetValue('cmi.score.min', '0');
        ScormProcessSetValue('cmi.score.max', '100');
        ScormProcessCommit();
      setScormData(initialValues);
        console.log('obteniendo nota',initialValues);
        
      return () => {
          window.onload = null;
          window.onbeforeunload = null;
        ScormProcessTerminate();
      }
    }, [])

    const handleBeforeUnload = () => {
        ScormProcessSetValue('cmi.success_status', 'failed');
        ScormProcessSetValue('cmi.completion_status', 'incomplete');
        ScormProcessCommit()
        ScormProcessSetValue('cmi.location', `${ejercicioActual}`);
        // verifySuccess();
        ScormProcessTerminate();
    };
   
    useEffect(() => {
        console.log('Cambio scorm Data', scormData);
    }, [scormData])
    
    const verifyStatus = ()=>{
    if (ejercicioActual === 0) {
        setScormData({ ...scormData, status: 'not attempted' });
        ScormProcessSetValue('cmi.completion_status', 'not attempted');
        ScormProcessCommit();
    } else if (ejercicioActual === 1) {
        setScormData({ ...scormData, status: 'incomplete' });
        ScormProcessSetValue('cmi.completion_status', 'incomplete');
        ScormProcessCommit();
    } else if (ejercicioActual === 2) {
        setScormData({ ...scormData, status: 'completed' });
        ScormProcessSetValue('cmi.completion_status', 'completed');
        ScormProcessCommit();
    }
    }
    const verifySuccess = ()=>{
        if (scormData.score >= 51) {
            setScormData({ ...scormData, success: 'passed' });
            ScormProcessSetValue('cmi.success_status', 'passed');
            ScormProcessCommit();
        } else if (scormData.score < 51) {
            setScormData({ ...scormData, success: 'failed' });
            ScormProcessSetValue('cmi.success_status', 'failed');
            ScormProcessCommit();
        } else  {
            setScormData({ ...scormData, success: 'unknown' });
            ScormProcessSetValue('cmi.success_status', 'unknown');
            ScormProcessCommit();
        }
    }
    
    const procesarCodigoEstudiante = (codigo, intentos) => {
        let codigoProcesado = codigo;
        if (intentos < 3) {
            codigoProcesado = codigo.replace(/#ayuda 1.*$/gm, '').replace(/#ayuda 2.*$/gm, '');
        } else if (intentos >= 3 && intentos < 5) {
            codigoProcesado = codigo.replace(/#ayuda 2.*$/gm, '');
        }
        setCodigoEstudiante(codigoProcesado);
    };

    const obtenerEjercicios = async () => {
        setFlag(true);
        const response = await fetch('http://localhost:8000/api/ejercicios');
        const data = await response.json();
        setEjercicios(data);
        setEjercicioActual(0); // Iniciar desde el primer ejercicio
        setPyprompt(procesarCodigoInicial(data[0].codigo_estudiante));
        setCodigoEstudiante(procesarCodigoInicial(data[0].codigo_estudiante));
    };

    const procesarCodigoInicial = (codigo) => {
        // Función para limpiar el código inicial de ayudas
        return codigo.replace(/#ayuda 1.*$/gm, '').replace(/#ayuda 2.*$/gm, '');
    };


    useEffect(() => {
        setFlag(false);
    }, [ejercicios]);

    useEffect(() => {

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
        const fullScript = ejercicios[ejercicioActual].codigo_docente + '\nprint(res)';
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
            setIntentosFallidos(0); // Reiniciar intentos fallidos si es correcto
        } else {
            // Incrementar intentos fallidos y procesar el código del estudiante
            const nuevosIntentosFallidos = intentosFallidos + 1;
            setIntentosFallidos(nuevosIntentosFallidos);
            procesarCodigoEstudiante(ejercicios[ejercicioActual].codigo_estudiante, nuevosIntentosFallidos);
        }
    };

    const handleSiguiente = () => {
        setScormData({...scormData,score: scormData.score + 20})
        ScormProcessSetValue('cmi.score.raw', `${scormData.score + 20}`);
        ScormProcessCommit();
        const nextEjercicio = ejercicioActual + 1;
        setEjercicioActual(nextEjercicio);
        setPyprompt(procesarCodigoInicial(ejercicios[nextEjercicio].codigo_estudiante));
        setCodigoEstudiante(procesarCodigoInicial(ejercicios[nextEjercicio].codigo_estudiante)); // Actualizar código del estudiante
        setPuedeContinuar(false);
        setResultadoEstudiante('');
    };

    const clickButtonSideBar = (idEjercicio)=>{
        const indexEjercicio = ejercicios.findIndex((ejercicio) => ejercicio.id === idEjercicio);
        setEjercicioActual(indexEjercicio);
    }

    return (
    <Stack direction={'row'}>
        <SideBar ejercicios={ejercicios} clickButtonSideBar={clickButtonSideBar} userType={'student'}/>
        <Container>
            {ejercicios.length === 0 ?
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
                    {!flag ? <CircularProgress size={50} /> : <Typography>No Hay Ejercicios creados</Typography>}
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
                    <AceEditor
                        mode="python"
                        theme="monokai"
                        onChange={setCodigoEstudiante}
                        name="codigoEstudiante"
                        editorProps={{ $blockScrolling: true }}
                        height="12em"
                        width="100%"
                        setOptions={{
                            showLineNumbers: true,
                        }}
                        value={codigoEstudiante}
                    />
                    <br />
                    <Grid container direction="column" spacing={2}>
                        <Grid item xs={12} container justifyContent="flex-start">
                            <Button variant="contained" onClick={handleRun}>
                                Correr
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                value={resultadoEstudiante}
                                error={isError}
                                InputProps={{
                                    style: { color: isError ? 'red' : 'black' },
                                }}
                            />
                        </Grid>

                        {intentosFallidos >= 3 && intentosFallidos < 5 && (
                            <Grid item xs={12}>
                                <Typography variant="body1" color="error">
                                    {ejercicios[ejercicioActual]?.ayuda_uno}
                                </Typography>
                            </Grid>
                        )}

                        {intentosFallidos >= 5 && (
                            <Grid item xs={12}>
                                <Typography variant="body1" color="error">
                                    {ejercicios[ejercicioActual]?.ayuda_dos}
                                </Typography>
                            </Grid>
                        )}

                        <Grid item xs={12} container justifyContent="flex-end">
                            <Button
                                variant="contained"
                                disabled={!puedeContinuar}
                                onClick={handleSiguiente}
                            >
                                Siguiente
                            </Button>
                            <Box>
                                {`${scormData}`}
                            </Box>
                        </Grid>
                    </Grid>
                </>
            }
        </Container>
    </Stack>
    );
}

export default Ejercicios;
