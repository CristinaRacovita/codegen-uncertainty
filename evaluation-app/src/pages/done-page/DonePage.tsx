import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function DonePage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // If we didn't come from evaluation, redirect to main page
        if (!location.state?.fromEvaluation) {
            const mode = localStorage.getItem('mode');
            navigate(mode === '1' ? '/hints' : '/no-hints', { replace: true });
            return;
        }

        // Block navigation when the user tries to go back
        const handlePopState = () => {
            // Push current state back to maintain the done page
            window.history.pushState(null, '', '/done');
            const mode = localStorage.getItem('mode');
            navigate(mode === '1' ? '/hints' : '/no-hints', { replace: true });
        };

        // Replace the current history entry
        window.history.replaceState(null, '', '/done');
        // Add a new history entry to catch the back button
        window.history.pushState(null, '', '/done');

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate, location.state]);

    const handleReturnToMain = () => {
        const mode = localStorage.getItem('mode');
        navigate(mode === '1' ? '/hints' : '/no-hints', { replace: true });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ 
                mt: 8, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 4
            }}>
                <Typography variant="h4" component="h1">
                    Thank You!
                </Typography>
                <Typography variant="body1" align="center">
                    Your evaluation has been submitted successfully.
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={handleReturnToMain}
                >
                    Return to Main Page
                </Button>
            </Box>
        </Container>
    );
}
