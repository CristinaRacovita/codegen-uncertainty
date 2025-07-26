import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

export default function DonePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [feedback, setFeedback] = useState('');

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

    const handleReturnToMain = async () => {
        const mode = localStorage.getItem('mode');
        if (mode === '1' && feedback) {
            await addDoc(collection(db, 'feedback'), { feedback });
        }

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
                <Typography variant="body1" align="center" width={400}>
                    <div style={{ color: '#01adee', fontWeight: 'bold', marginBottom: 20 }}> Your evaluation has been submitted successfully.</div>
                    {localStorage.getItem('mode') === '1' && (
                        <div>
                            <div style={{ marginBottom: 10 }}> Is there anything you would like to share about your experience with the experiment? </div>
                            <textarea style={{ width: 400, height: 150 }} value={feedback}
                                onChange={(e) => setFeedback(e.target.value)} />
                        </div>
                    )}
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
