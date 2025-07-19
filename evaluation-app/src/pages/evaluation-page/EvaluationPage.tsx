import { useState, useEffect } from 'react';
import { Box, Stepper, Step, StepLabel, Paper, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ParticipantConsent, { ParticipantData } from '../../components/participant-consent/ParticipantConsent';
import CodeChallenge from '../../components/code-challenge/CodeChallenge';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const STORAGE_KEY = 'evaluationProfileData';
const CODE_STORAGE_KEY = 'evaluationCodeContent';

export default function EvaluationPage() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [code, setCode] = useState(() => {
        const savedCode = localStorage.getItem(CODE_STORAGE_KEY);
        return savedCode ? savedCode : '';
    });

    const [profile, setProfile] = useState<ParticipantData>(() => {
        const savedProfile = localStorage.getItem(STORAGE_KEY);
        return savedProfile
            ? JSON.parse(savedProfile)
            : {
                consent: false,
                startTime: '',
                endTime: '',
                codeText: ''
            };
    });

    // Save profile to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }, [profile]);

    useEffect(() => {
        localStorage.setItem(CODE_STORAGE_KEY, code);
    }, [code]);

    const steps = ['Participant Consent', 'Code Challenge'];

    const handleNext = () => {
        if (activeStep === 0) {
            const updatedProfile = {
                ...profile,
                startTime: new Date().toISOString(),
                consent: false
            };
            setProfile(updatedProfile);
        }

        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            const mode = localStorage.getItem('mode');
            navigate(mode === '1' ? '/hints' : '/no-hints', { replace: true });
        } else {
            setActiveStep((prevStep) => prevStep - 1);
        }
    };

    const handleFinish = async () => {
        const endTime = new Date().toISOString();

        const start = new Date(profile.startTime);
        const end = new Date(endTime);
        const timeInSeconds = Math.round((end.getTime() - start.getTime()) / 1000);
        const mode = localStorage.getItem('mode') === "1" ? "hints" : "no-hints"

        const completedProfile = {
            ...profile,
            consent: true,
            endTime: new Date().toISOString(),
            codeText: code,
            timeInSeconds ,
            mode
        };

        try {
            await addDoc(collection(db, 'evaluations'), completedProfile);
            console.log('Evaluation data saved to Firebase:', completedProfile);
        } catch (error) {
            console.error('Error saving to Firebase:', error);
        }

        // Clear the stored data
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(CODE_STORAGE_KEY);

        // Navigate to done page
        navigate('/done', {
            replace: true,
            state: { fromEvaluation: true }
        });
    };

    const handleProfileUpdate = (newProfile: ParticipantData) => {
        setProfile(newProfile);
    };

    const handleCodeChange = (newCode: string) => {
        setCode(newCode);
    };

    // Mock problem data - this would come from your backend
    const mockProblem = {
        title: 'Sample Coding Problem',
        description: 'Write a function that...',
        generatedCode: '// Generated code will appear here\nfunction solution() {\n  // ...\n}',
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <ParticipantConsent onProfileUpdate={handleProfileUpdate} />
                    </Paper>
                );
            case 1:
                return (
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <CodeChallenge
                            problem={mockProblem}
                            onCodeChange={handleCodeChange}
                        />
                    </Paper>
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" style={{paddingBottom: 20}}>
            <Box sx={{ width: '100%', mt: 4 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 1 && (
                    <div className='task-description' title="These scores are estimates, not guarantees. Always verify the correctness of the code yourself. High confidence doesn't always mean correctness, and low confidence doesn't always mean an error.">
                        <span className='task-introduction'>Your task is simple:</span> review the generated code, with or without explanations, and submit your solution. We'll measure how long it takes, how accurate your solution is, and how much of the original code you edit.
                    </div>
                )}
                {renderStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, gap: 2 }}>
                    <Button
                        onClick={handleBack}
                        variant="outlined"
                    >
                        {activeStep === 0 ? 'Return to Main' : 'Back'}
                    </Button>
                    <Box>
                        {activeStep < steps.length - 1 && (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                disabled={!profile.consent}
                            >
                                Start
                            </Button>
                        )}
                        {activeStep === steps.length - 1 && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFinish}
                            >
                                Finish Evaluation
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}