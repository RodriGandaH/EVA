import React, { useState, useEffect } from 'react';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import { Container, Grid, Typography, Button, TextField, Stack, IconButton, CircularProgress, Box } from '@mui/material';
import TerminalPyodide from '../pages/TerminalPyodide';
import { useNavigate } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import SideBar from './SideBar';
import { Pyodide } from '../pyodide';
import {
    ScormProcessInitialize,
    ScormProcessTerminate,
} from '../../scorm-utils';
import { setScoreCompletionSuccess } from '../../scorm-seters';

function Ejercicios() {
    const pyodide = Pyodide.getInstance();
    const [pyprompt, setPyprompt] = useState('');
    const [pyoutput, setPyoutput] = useState(null);
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);
    const [ejercicioActual, setEjercicioActual] = useState(0);
    const [resultadoDocente, setResultadoDocente] = useState('');
    const [puedeContinuar, setPuedeContinuar] = useState(false);
    const [intentosFallidos, setIntentosFallidos] = useState(0); // Estado para contar los intentos fallidos

    // Función para procesar el código del estudiante y ocultar ayudas según los intentos fallidos
    useEffect(() => {
      obtenerEjercicios();
      ScormProcessInitialize();
      window.onload = handleBeforeUnload;
      window.onbeforeunload = handleBeforeUnload;
      return()=>{
        handleBeforeUnload();
      }
    }, [])

    useEffect(() => {
        setFlag(false);
    }, [ejercicios]);

    useEffect(() => {
        setResultadoDocente(runCodigoDocente(ejercicios[ejercicioActual]?.codigo_docente));
        setPyprompt(procesarCodigoInicial(ejercicios[ejercicioActual]?.codigo_estudiante || ''));
        setPyoutput('');
        setIntentosFallidos(0);
        setScoreCompletionSuccess(ejercicioActual, ejercicios.length, ejercicioActual === ejercicios.length - 1 && puedeContinuar);

    }, [ejercicioActual,ejercicios])

    useEffect(() => {
        let codigoProcesado;
        if (intentosFallidos < 3) {
            codigoProcesado = pyprompt.replace(/#ayuda 1.*$/gm, '').replace(/#ayuda 2.*$/gm, '');
        } else if (intentosFallidos >= 3 && intentosFallidos < 5) {
            codigoProcesado = pyprompt.replace(/#ayuda 2.*$/gm, '');
        }
        setPyprompt(codigoProcesado);
        console.log(intentosFallidos);

    }, [intentosFallidos])
    

    const obtenerEjercicios = async () => {
        setFlag(true);
        const response = await fetch('http://localhost:8000/api/ejercicios');
        const data = await response.json();
        setEjercicios(data);
    };
    
    const runCodigoDocente = (codigoDocente) =>{
        console.log('codigo docente recibido', codigoDocente);
        let resultado;
        pyodide.setOutput((text) => {
            resultado = text;
        });
        pyodide.run(codigoDocente);
        console.log('resultado docenteEnRunCodigo',resultado);
        return resultado
    }

    const runFunction = (resultadoEstudiante) =>{
        let correcto =  resultadoDocente == resultadoEstudiante
        if(!correcto){
            setIntentosFallidos(intentosFallidos+1);
            return;
        }
        console.log("resDoc: ",resultadoDocente,'\n','resEst',resultadoEstudiante );
        setPuedeContinuar(true)
    }
    const handleBeforeUnload = () => {
        // console.log('llamando a handleBeforeUnload',ejercicios);
        // setScoreCompletionSuccess(ejercicioActual, ejercicios.length, ejercicioActual === ejercicios.length - 1 && puedeContinuar);
        ScormProcessTerminate();
        window.onload = null;
        window.onbeforeunload = null;
    };
    
    const procesarCodigoInicial = (codigo) => {
        return codigo.replace(/#ayuda 1.*$/gm, '').replace(/#ayuda 2.*$/gm, '');
    };


    const handleSiguiente = () => {
        const nextEjercicio = ejercicioActual + 1;
        setEjercicioActual(nextEjercicio);
        setPyprompt(procesarCodigoInicial(ejercicios[nextEjercicio]?.codigo_estudiante));
        setIntentosFallidos(0)
        setPuedeContinuar(false);
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
                    <TerminalPyodide pyoutput={pyoutput} pyprompt={pyprompt} setPyoutput={setPyoutput} setPyprompt={setPyprompt}  runFunction={runFunction}/>
                    <br />
                    <Grid container direction="column" spacing={2}>
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
                            {
                                ejercicioActual === ejercicios.length-1 && puedeContinuar ? 
                                <Button>Curso Terminado Felicitaciones</Button> :
                                <Button
                                variant="contained"
                                disabled={!puedeContinuar}
                                onClick={handleSiguiente}
                                >
                                    Siguiente
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </>
            }
        </Container>
    </Stack>
    );
}

export default Ejercicios;
