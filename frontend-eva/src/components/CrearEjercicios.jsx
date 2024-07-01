import React, { useState,useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import TerminalPyodide from '../pages/TerminalPyodide';
import TextEditor from './TextEditor';
import { GoHomeFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

import {
    Container,
    Stack,
    Box,
    Typography,
    Button,
    TextField,
    CircularProgress,
    IconButton,
} from '@mui/material';

function CrearEjercicios() {
    const [pyprompt, setPyprompt] = useState('');
    const [pyoutput, setPyoutput] = useState(null);
    const [codigoEstudiante, setCodigoEstudiante] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [flag, setFlag] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setFlag(true);
        const response = await fetch('http://localhost:8000/api/ejercicios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descripcion,
                codigo_docente: pyprompt,
                codigo_estudiante: codigoEstudiante,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al enviar el ejercicio');
        }else{
            setFlag(false);
            await obtenerEjercicios();
        }

        const data = await response.json();
        console.log(data);
        setDescripcion('');
        setPyprompt('');
        setCodigoEstudiante('');
    };

    const obtenerEjercicios = async ()=>{
        const response = await fetch('http://localhost:8000/api/ejercicios');
        const data = await response.json();
        setEjercicios(data);
    }

    const clickButtonSideBar = (idEjercicio)=>{
        if(idEjercicio < 0){
            setPyprompt('');
            setDescripcion('');
            setCodigoEstudiante('');
            return;
        }
        const ejercicioActual = ejercicios.find(ejercicio => ejercicio.id === idEjercicio);
        setPyprompt(ejercicioActual.codigo_docente);
        setDescripcion(ejercicioActual.descripcion);
        setCodigoEstudiante(ejercicioActual.codigo_estudiante);
    }

    useEffect(() => {
        obtenerEjercicios();
    }, [])
    
    return (
    <Stack>
        <SideBar ejercicios={ejercicios} userType={'teacher'} clickButtonSideBar={clickButtonSideBar}/>
        <Container>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography variant="h4" gutterBottom>
                    Crear Ejercicios
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
                    onClick={()=>navigate('/home')}
                >
                    <GoHomeFill size={25} /> 
                </IconButton>
            </Stack>
            <Stack spacing={3}>
                <Typography variant="h6">Descripcion</Typography>
                <TextEditor setDescripcion={setDescripcion} descripcion={descripcion}/>
                <Typography variant="h6">Código Docente</Typography>
                <TerminalPyodide pyprompt={pyprompt} setPyprompt={setPyprompt} pyoutput={pyoutput} setPyoutput={setPyoutput}/>

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
                <Button variant="contained" onClick={handleSubmit} disabled={flag}>
                    {!flag ? 'Guardar Ejercicio' : <CircularProgress size={20} color='success' />}
                </Button>
            </Stack>
        </Container>
    </Stack>
    );
}

export default CrearEjercicios;
