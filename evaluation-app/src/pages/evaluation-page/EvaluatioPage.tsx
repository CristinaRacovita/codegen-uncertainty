import { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Paper, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeveloperProfile, { DeveloperProfileData } from '../../components/developer-profile/DeveloperProfile';
import CodeChallenge from '../../components/code-challenge/CodeChallenge';

export default function EvaluationPage() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [profile, setProfile] = useState<DeveloperProfileData>({
        experience: '',
        programmingLanguages: [],
    });

    const steps = ['Developer Profile', 'Code Challenge'];

    const handleNext = () => {
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

    const handleFinish = () => {
        // Navigate to done page, replace history, and pass state
        navigate('/done', { 
            replace: true,
            state: { fromEvaluation: true }
        });
    };

    const handleProfileUpdate = (newProfile: DeveloperProfileData) => {
        setProfile(newProfile);
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
                        <DeveloperProfile onProfileUpdate={handleProfileUpdate} />
                    </Paper>
                );
            case 1:
                return (
                    <Paper sx={{ p: 3, mt: 2 }}>
                        <CodeChallenge problem={mockProblem} />
                    </Paper>
                );
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ width: '100%', mt: 4 }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
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
                                disabled={!profile.experience || profile.programmingLanguages.length === 0}
                            >
                                Next
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