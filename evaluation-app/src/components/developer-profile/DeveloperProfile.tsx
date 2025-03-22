import { Box, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useState, useEffect, ReactNode } from 'react';

export interface DeveloperProfileData {
    evaluationId: string;
    pythonExperience: string;
    pythonFrequency: string;
    aiUsage: string;
}

interface DeveloperProfileProps {
    onProfileUpdate: (profile: DeveloperProfileData) => void;
}

const PYTHON_EXPERIENCE_OPTIONS = [
    '< 1 year',
    '3-5 years',
    'More then 5 years'
];

const PYTHON_FREQUENCY_OPTIONS = [
    'Daily',
    'Weekly',
    'Once a week',
    'When needed'
];

const AI_USAGE_OPTIONS = [
    'Never',
    'Weekly',
    'Twice a week',
    'When needed'
];

export default function DeveloperProfile({ onProfileUpdate }: DeveloperProfileProps) {
    // Initialize profile from parent component's state
    const [profile, setProfile] = useState<DeveloperProfileData>(() => {
        const savedProfile = localStorage.getItem('evaluationProfileData');
        return savedProfile ? JSON.parse(savedProfile) : {
            evaluationId: '',
            pythonExperience: '',
            pythonFrequency: '',
            aiUsage: ''
        };
    });

    // Sync with parent component on mount
    useEffect(() => {
        onProfileUpdate(profile);
    }, []);

    const handleTextChange = (field: keyof DeveloperProfileData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        // Only allow numbers for evaluationId
        if (field === 'evaluationId' && !/^\d*$/.test(event.target.value)) {
            return;
        }
        const newProfile = {
            ...profile,
            [field]: event.target.value
        };
        setProfile(newProfile);
        onProfileUpdate(newProfile);
    };

    const handleSelectChange = (field: keyof DeveloperProfileData) => (
        event: SelectChangeEvent<string>, 
        child: ReactNode
    ) => {
        const newProfile = {
            ...profile,
            [field]: event.target.value
        };
        setProfile(newProfile);
        onProfileUpdate(newProfile);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
                label="Evaluation ID"
                type="text"
                inputMode="numeric"
                value={profile.evaluationId}
                onChange={handleTextChange('evaluationId')}
                fullWidth
                required
                inputProps={{
                    pattern: '[0-9]*'
                }}
            />
            <FormControl fullWidth required>
                <InputLabel>Years Coding in Python</InputLabel>
                <Select
                    value={profile.pythonExperience}
                    onChange={handleSelectChange('pythonExperience')}
                    label="Years Coding in Python"
                >
                    {PYTHON_EXPERIENCE_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth required>
                <InputLabel>How frequently do you code in Python?</InputLabel>
                <Select
                    value={profile.pythonFrequency}
                    onChange={handleSelectChange('pythonFrequency')}
                    label="How frequently do you code in Python?"
                >
                    {PYTHON_FREQUENCY_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth required>
                <InputLabel>How often do you use AI for code generation/completion?</InputLabel>
                <Select
                    value={profile.aiUsage}
                    onChange={handleSelectChange('aiUsage')}
                    label="How often do you use AI for code generation/completion?"
                >
                    {AI_USAGE_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
