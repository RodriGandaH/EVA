import { Link } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';
function Print() {
    return (
        <Container sx={{ maxWidth: '70%', mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="outlined" component={Link} to="/">
                    Inicio
                </Button>
            </Box>
            <Typography variant="h4" gutterBottom align="center">
                Print en Python
            </Typography>
            <Typography variant="body1">
                Para imprimir en Python se utiliza la función{' '}
                <code>print()</code>.
            </Typography>
            <Typography variant="body1">Ejemplo:</Typography>
            <Box
                component="pre"
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    p: 1,
                    borderRadius: 1,
                }}
            >
                <code>{`print("Hola, mundo!")`}</code>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" component={Link} to="/exercise">
                    Siguiente
                </Button>
            </Box>
        </Container>
    );
}

export default Print;
