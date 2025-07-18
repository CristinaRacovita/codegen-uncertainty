import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';

export interface ParticipantConsentData {
    consent: boolean;
}

interface ParticipantConsentProps {
    onProfileUpdate: (profile: ParticipantConsentData) => void;
}

export default function ParticipantConsent({ onProfileUpdate }: ParticipantConsentProps) {
    // Initialize profile from parent component's state
    const [profile, setProfile] = useState<ParticipantConsentData>(() => {
        const savedProfile = localStorage.getItem('evaluationProfileData');
        return savedProfile ? JSON.parse(savedProfile) : {
            consent: false
        };
    });

    const handleCheckboxChange = (field: keyof ParticipantConsentData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newProfile = {
            ...profile,
            [field]: event.target.checked
        };
        setProfile(newProfile);
        onProfileUpdate(newProfile);
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <div style={{ textAlign: 'left', fontWeight: 'bold', marginTop: '15px', color: '#203568' }}>
                Please confirm by checking the box below that:
            </div>
            <ul style={{ textAlign: 'left' }}>
                <li>You are at least 18 years old.</li>
                <li>Your are fluent in English.</li>
                <li>You are familiar with writing code in Python.</li>
                <li>You understand the purpose of the study and what is expected of you.</li>
                <li>You voluntarily agree to participate in this research.</li>
            </ul>

            <FormGroup>
                <FormControlLabel required control={<Checkbox onChange={handleCheckboxChange('consent')} />} label="I agree to participate in this study" style={{ fontStyle: 'italic', color: '#01adee' }} />
            </FormGroup>

        </Box>
    );
}
