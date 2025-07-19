import { Box, Paper, Tooltip, Typography } from '@mui/material';
import CodeMirror, { Decoration, EditorView, RangeSetBuilder } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { githubLight } from '@uiw/codemirror-theme-github';
import { useState, useEffect } from 'react';
import './CodeChallenge.css';

interface CodeChallengeProps {
    problem: {
        title: string;
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

    const lineHighlightExtension = EditorView.decorations.compute([], (state) => {
        const builder = new RangeSetBuilder<Decoration>();
        const redLineNumbers = [3, 5, 6, 8, 13, 14, 16, 17];
        const greenLineNumbers = [1, 2, 4, 7, 9, 10, 11, 12, 15];

        for (let i = 1; i <= state.doc.lines; i++) {
            if (redLineNumbers.includes(i)) {
                const line = state.doc.line(i);
                const decoration = Decoration.line({ class: 'red-line' });
                builder.add(line.from, line.from, decoration);
                continue;
            }
        }

        return builder.finish();
    });

    return (
        <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 200px)' }}>
            <Paper sx={{ flex: 1, p: 2, overflow: 'auto' }}>
                <Typography variant="h6" gutterBottom fontWeight={'bold'}>
                    {problem.title}
                </Typography>
                <div></div>
                <Typography variant="body1">
                    <div style={{ marginBottom: 10 }}>
                        People working in your company like partying. They usually go to night clubs on Friday and Saturday. There are N people working in your company and there are N clubs in the city. Unfortunately, if there is more than one employee in night club, level of coolness goes infinitely high and party is over, so club owners will never let more than one employee enter their club in the same week (just to be sure).
                    </div>
                    <div>
                        You are organizing night life for your company employees and you have statistics about how much every employee likes Friday and Saturday parties for all clubs. You need to match people with clubs maximizing overall sum of their happiness (they are happy as much as they like the club), while half of people should go clubbing on Friday and the other half on Saturday.
                    </div>

                    <div style={{ fontWeight: 'bold' }}>Input</div>
                    <ul>
                        <li>
                            N: number of employees in your company and number of clubs
                            <div>2 ≤ N ≤ 20; N is even</div>
                        </li>
                        <li>
                            Friday Matrix: N × N matrix where element in i-th row and j-th column is an integer number that represents how much i-th person likes j-th club’s Friday party.
                        </li>
                        <li>
                            Saturday Matrix: N × N matrix where element in i-th row and j-th column is an integer number that represents how much i-th person likes j-th club’s Saturday party.
                        </li>
                    </ul>

                    <div style={{ fontWeight: 'bold' }}>Output</div>

                    Output should contain a single integer = maximum sum of happiness possible.

                    <div style={{ textDecorationLine: 'underline' }}>Example</div>
                    <div>Input</div>

                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div>N = 4</div>
                        <div>
                            <div>Friday Matrix</div>
                            <table style={{ borderCollapse: "collapse", marginBottom: "20px" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>2</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>3</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>4</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>2</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>3</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>4</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>3</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>4</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>2</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>4</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>2</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>3</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <div>Saturday Matrix</div>
                            <table style={{ borderCollapse: "collapse" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>5</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>8</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>7</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>6</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>9</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>81</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>3</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>55</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>78</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>6</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                        <td style={{ border: '1px solid #333', padding: 8, textAlign: 'center' }}>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>


                    <div>Output</div>
                    167

                    <div><span style={{ fontWeight: 'bolder' }}>Link: </span><span><a href='https://codeforces.com/contest/575/problem/C' target="_blank" rel="noopener noreferrer">here</a></span></div>
                </Typography>
            </Paper>
            <Tooltip title="These line colors are estimates, not guarantees! You should always verify the correctness of the code yourself!" arrow>
                <Paper sx={{ flex: 1, p: 2 }}>
                    <CodeMirror
                        value={code}
                        height="100%"
                        theme={githubLight}
                        extensions={[python(), lineHighlightExtension]}
                        editable={true}
                        onChange={handleCodeChange}
                    />
                </Paper>
            </Tooltip>

        </Box>
    );
}
