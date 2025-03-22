import { Box, Paper, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { githubLight } from '@uiw/codemirror-theme-github';

interface CodeChallengeProps {
    problem: {
        title: string;
        description: string;
        generatedCode: string;
    };
}

export default function CodeChallenge({ problem }: CodeChallengeProps) {
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
                    value={problem.generatedCode}
                    height="100%"
                    theme={githubLight}
                    extensions={[python()]}
                    editable={true}
                />
            </Paper>
        </Box>
    );
}
