import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import { Container, Grid, Typography, Button,  Stack, CircularProgress, Box } from '@mui/material';
import TerminalPyodide from '../pages/TerminalPyodide';
import SideBar from './SideBar';
import { Pyodide } from '../pyodide';
import {
    ScormProcessGetValue,
    ScormProcessInitialize,
    ScormProcessTerminate,
} from '../../scorm-utils';
import { setScoreCompletionSuccess } from '../../scorm-seters';
import AlertDialog from './Dialog';

function Ejercicios() {
    const pyodide = Pyodide.getInstance();
    const [open, setOpen] = useState(false)
    const [pyprompt, setPyprompt] = useState('');
    const [pyoutput, setPyoutput] = useState(null);
    const [flag, setFlag] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);
    const [ejercicioActual, setEjercicioActual] = useState(0);
    const [resultadoDocente, setResultadoDocente] = useState('');
    const [puedeContinuar, setPuedeContinuar] = useState(false);
    const [intentosFallidos, setIntentosFallidos] = useState(0); // Estado para contar los intentos fallidos
    const navigate = useNavigate();

    // Función para procesar el código del estudiante y ocultar ayudas según los intentos fallidos
    useEffect(() => {
        ScormProcessInitialize();
        obtenerEjercicios();
        
        window.onload = handleBeforeUnload;
        window.onbeforeunload = handleBeforeUnload;
        
        setFlag(false);
      return()=>{
        handleBeforeUnload();
      }
    }, [])
    useEffect(() => {
      console.log('Ejercicios',ejercicios);
    }, [ejercicios])
    
      
    useEffect(() => {
        console.log('ejercicio actual',ejercicioActual);
        if(ejercicioActual>0 && ejercicioActual <= ejercicios.length && ejercicios.length >0){
            setPyoutput('');
            setIntentosFallidos(0);
            setScoreCompletionSuccess(ejercicioActual, ejercicios.length, ejercicioActual === (ejercicios.length) && puedeContinuar );
            if (ejercicioActual >= ejercicios.length) {
                setOpen(true)
                return
            }
            setResultadoDocente(runCodigoDocente(ejercicios[ejercicioActual]?.codigo_docente));
            setPyprompt(procesarCodigoInicial(ejercicios[ejercicioActual]?.codigo_estudiante || ''));
           
        }
        
    }, [ejercicioActual,ejercicios])

    useEffect(() => {
        let codigoProcesado;
        if (intentosFallidos < 3) {
            codigoProcesado = pyprompt.replace(/#ayuda 1.*$/gm, '').replace(/#ayuda 2.*$/gm, '');
        } else if (intentosFallidos >= 3 && intentosFallidos < 5) {
            codigoProcesado = pyprompt.replace(/#ayuda 2.*$/gm, '');
        }
        setPyprompt(codigoProcesado);
    }, [intentosFallidos])

    const markCompleted = (index)=>{
        if(index === 0) return []
        const ejerciciosCopia = [...ejercicios];
        if(index < ejercicios.length){
            ejerciciosCopia[index - 1] = { ...ejerciciosCopia[index - 1], status: 'completed' }
            ejerciciosCopia[index] = { ...ejerciciosCopia[index], status: 'attemp' }
        }
        return ejerciciosCopia;
    }
    const agregarAtributoEstado= (data,ejercicioIndice)=>{
        const ejerciciosConEstado = data.map((ejercicio, index) => {
            let status = 'incomplete'
            if(index === ejercicioIndice){
               status = 'attemp'
            }
            if(index < ejercicioIndice){
                status = 'completed'
            }
            return {...ejercicio, status: status }
        })
        return ejerciciosConEstado;
    }
    const obtenerEjercicios = async () => {
        setFlag(true);
        const ejercicioPendiente = ScormProcessGetValue('cmi.location', false)
        const response = await fetch('http://localhost:8000/api/ejercicios');
        const data = await response.json();
        setResultadoDocente(runCodigoDocente(data[0]?.codigo_docente));
        setPyprompt(procesarCodigoInicial(data[0]?.codigo_estudiante || ''));
        if(ejercicioPendiente) {
            setEjercicioActual(Number(ejercicioPendiente))
            setEjercicios(agregarAtributoEstado(data,Number(ejercicioPendiente)))
            return;
        }
        setEjercicios(agregarAtributoEstado(data,ejercicioActual));
    };
    
    const runCodigoDocente = (codigoDocente) =>{
        let resultado;
        pyodide.setOutput((text) => {
            resultado = text;
        });
        pyodide.run(codigoDocente);
        return resultado
    }

    const runFunction = (resultadoEstudiante) =>{
        console.log("resDoc: ",resultadoDocente,'\n','resEst',resultadoEstudiante );
        let correcto =  resultadoDocente == resultadoEstudiante
        if(!correcto){
            setIntentosFallidos(intentosFallidos+1);
            return;
        }
        setPuedeContinuar(true)
    }
    const handleBeforeUnload = () => {
        ScormProcessTerminate();
        window.onload = null;
        window.onbeforeunload = null;
    };
    
    const procesarCodigoInicial = (codigo) => {
        return codigo.replace(/#ayuda 1.*$/gm, '').replace(/#ayuda 2.*$/gm, '');
    };


    const handleSiguiente = () => {
        setEjercicios(markCompleted(ejercicioActual+1));
        const nextEjercicio = ejercicioActual + 1;
        setEjercicioActual(nextEjercicio);
        // setPyprompt(procesarCodigoInicial(ejercicios[nextEjercicio]?.codigo_estudiante));
        setPuedeContinuar(nextEjercicio === ejercicios.length);
    };

    const clickButtonSideBar = (idEjercicio)=>{
        const indexEjercicio = ejercicios.findIndex((ejercicio) => ejercicio.id === idEjercicio);
        setEjercicioActual(indexEjercicio);
    }

    return (
    <Stack direction={'row'}>
        <SideBar ejercicios={ejercicios} clickButtonSideBar={clickButtonSideBar} userType={'student'}/>
        <Container>
            {open && <AlertDialog open={open} setOpen={setOpen}/>}
            {ejercicios.length === 0 ?
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        backgroundColor: '#f0f0f0', 
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
                               
                                <Button
                                variant="contained"
                                disabled={!puedeContinuar || ejercicioActual >=ejercicios.length}
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
