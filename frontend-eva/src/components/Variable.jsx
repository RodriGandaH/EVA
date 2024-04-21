import { Link } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';
function Variable() {
    return (
        <Container sx={{ maxWidth: '70%', mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button variant="outlined" component={Link} to="/">
                    Inicio
                </Button>
            </Box>
            <Typography variant="h4" gutterBottom align="center">
                Entrada/salida de datos - Variables - Tipos de datos
            </Typography>
            <Typography variant="body1">
                Acontinuación veremos 3 variables distintas porque Python (como muchos otros lenguajes) distingue mayúsculas y minúsculas. <br/>
                Ademas la variable tomará el último valor asignado (lo que tuviera guardado anteriormente la variable, se pierde). <br/>
                en este caso variable =3 es remplazado por variable = 4.
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
                Variable = 5 <br/>
                variable = 3 <br/>
                variable = 4 <br/>
                VaRiAbLe = 8 <br/>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" component={Link} to="/variableEj">
                    Siguiente
                </Button>
            </Box>
        </Container>
    );
}

export default Variable;
