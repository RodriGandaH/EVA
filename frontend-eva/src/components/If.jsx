import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';
function If() {
    return (
        <Container
            sx={{
                m: 2,
                maxWidth: '70%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 auto',
            }}
        >
            <Typography variant="h4" gutterBottom>
                If
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    mt: 2,
                }}
            >
                <Button variant="outlined" component={Link} to="/exercise">
                    Anterior
                </Button>
                <Button variant="outlined" component={Link} to="">
                    Siguiente
                </Button>
            </Box>
        </Container>
    );
}

export default If;
