import { Box, Paper, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { githubLight } from '@uiw/codemirror-theme-github';
import { useState, useEffect } from 'react';
import './CodeChallenge.css';

interface CodeChallengeProps {
    problem: {
        title: string;
        description: string;
        generatedCode: string;
    };
    onCodeChange: (code: string) => void;
}

const STORAGE_KEY = 'evaluationCodeContent';

export default function CodeChallenge({ problem, onCodeChange }: CodeChallengeProps) {
    // Initialize code from localStorage or problem's generated code
    const [code, setCode] = useState(() => {
        const savedCode = localStorage.getItem(STORAGE_KEY);
        return savedCode || problem.generatedCode;
    });

    // Sync with parent component on mount
    useEffect(() => {
        onCodeChange(code);
    }, []);

    const handleCodeChange = (value: string) => {
        setCode(value);
        localStorage.setItem(STORAGE_KEY, value);
        onCodeChange(value);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 200px)' }}>
            <Paper sx={{ flex: 1, p: 2, overflow: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                    {problem.title}
                </Typography>
                <Typography variant="body1">
                    {problem.description}
                </Typography>
            </Paper>
            <Paper sx={{ flex: 1, p: 2 }}>
                <CodeMirror
                    value={code}
                    height="100%"
                    theme={githubLight}
                    extensions={[python()]}
                    editable={true}
                    onChange={handleCodeChange}
                />
            </Paper>
        </Box>
    );
}
