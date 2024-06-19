import React, { useState } from 'react';
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

function CrearEjercicios() {
    const [codigoDocente, setCodigoDocente] = useState('');
    const [codigoEstudiante, setCodigoEstudiante] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:8000/api/ejercicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descripcion,
                codigo_docente: codigoDocente,
                codigo_estudiante: codigoEstudiante,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al enviar el ejercicio');
        }

        const data = await response.json();
        console.log(data);
        setDescripcion('');
        setCodigoDocente('');
        setCodigoEstudiante('');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Crear Ejercicio
            </Typography>
            <Stack spacing={3}>
                <TextField
                    label="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <Typography variant="h6">Código Docente</Typography>
                <AceEditor
                    mode="python"
                    theme="monokai"
                    onChange={setCodigoDocente}
                    name="codigoDocente"
                    editorProps={{ $blockScrolling: true }}
                    height="12em"
                    width="100%"
                    setOptions={{
                        showLineNumbers: true,
                    }}
                    value={codigoDocente}
                />
                <Typography variant="h6">Código Estudiante</Typography>
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
                <Button variant="contained" onClick={handleSubmit}>
                    Guardar Ejercicio
                </Button>
            </Stack>
        </Container>
    );
}

export default CrearEjercicios;
