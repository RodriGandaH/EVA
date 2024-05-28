import React, { useState, useEffect } from 'react';
import { jsPython } from 'jspython-interpreter';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import { Container, Grid, Typography, Button, TextField } from '@mui/material';

function Ejercicios() {
    const [ejercicios, setEjercicios] = useState([]);
    const [ejercicioActual, setEjercicioActual] = useState(0);
    const [codigoEstudiante, setCodigoEstudiante] = useState('');
    const [resultadoEstudiante, setResultadoEstudiante] = useState('');
    const [isError, setIsError] = useState(false);
    const [resultadoDocente, setResultadoDocente] = useState('');
    const [puedeContinuar, setPuedeContinuar] = useState(false);

    const obtenerEjercicios = async () => {
        const response = await fetch('http://localhost:8000/api/ejercicios');
        const data = await response.json();
        setEjercicios(data);
        setCodigoEstudiante(data[0].codigo_estudiante);
    };

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

    useEffect(() => {
        obtenerEjercicios();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {ejercicios[ejercicioActual]?.titulo}
            </Typography>
            <Typography variant="body1">
                {ejercicios[ejercicioActual]?.descripcion}
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

                <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                        variant="contained"
                        disabled={!puedeContinuar}
                        onClick={handleSiguiente}
                    >
                        Siguiente
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Ejercicios;
