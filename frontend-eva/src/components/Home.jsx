import { Link } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';

function Home() {
    return (
        <Container sx={{ m: 2, maxWidth: '70%', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
                Python
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
                    to=""
                    sx={{ width: '25%' }}
                >
                    Intermedio
                </Button>
                <Button
                    variant="outlined"
                    component={Link}
                    to=""
                    sx={{ width: '25%' }}
                >
                    Avanzado
                </Button>
            </Box>
        </Container>
    );
}

export default Home;
