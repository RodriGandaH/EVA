import { Link } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';

function Home() {
    return (
        <Container sx={{ m: 2, maxWidth: '70%', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                Plataforma de Aprendizaje de Python
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'center',
                }}
            >
                <Button
                    variant="outlined"
                    component={Link}
                    to="/basico"
                    sx={{ width: '25%' }}
                >
                    Basico
                </Button>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/crear-ejercicios"
                    sx={{ width: '25%' }}
                >
                    Crear Ejercicios
                </Button>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/ejercicios"
                    sx={{ width: '25%' }}
                >
                    Ejercicios Creados
                </Button>
            </Box>
        </Container>
    );
}

export default Home;
