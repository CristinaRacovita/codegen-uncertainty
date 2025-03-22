import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Chip, OutlinedInput } from '@mui/material';
import { useState } from 'react';

export interface DeveloperProfileData {
    experience: string;
    programmingLanguages: string[];
}

interface DeveloperProfileProps {
    onProfileUpdate: (profile: DeveloperProfileData) => void;
}

const PROGRAMMING_LANGUAGES = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#',
    'Go', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Rust'
];

export default function DeveloperProfile({ onProfileUpdate }: DeveloperProfileProps) {
    const [profile, setProfile] = useState<DeveloperProfileData>({
        experience: '',
        programmingLanguages: [],
    });

    const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newProfile = {
            ...profile,
            experience: event.target.value,
        };
        setProfile(newProfile);
        onProfileUpdate(newProfile);
    };

    const handleLanguagesChange = (event: any) => {
        const value = event.target.value;
        const newProfile = {
            ...profile,
            programmingLanguages: typeof value === 'string' ? value.split(',') : value,
        };
        setProfile(newProfile);
        onProfileUpdate(newProfile);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
                label="Years of Experience"
                type="number"
                value={profile.experience}
                onChange={handleExperienceChange}
                fullWidth
            />
            <FormControl fullWidth>
                <InputLabel>Programming Languages</InputLabel>
                <Select
                    multiple
                    value={profile.programmingLanguages}
                    onChange={handleLanguagesChange}
                    input={<OutlinedInput label="Programming Languages" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                >
                    {PROGRAMMING_LANGUAGES.map((lang) => (
                        <MenuItem key={lang} value={lang}>
                            {lang}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
