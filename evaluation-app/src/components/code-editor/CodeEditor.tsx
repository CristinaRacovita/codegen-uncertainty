import React from 'react';
import { Box } from '@mui/material';
import CodeMirror, { Decoration, EditorView, RangeSetBuilder } from '@uiw/react-codemirror';
import './CodeEditor.css';
import { githubLight } from '@uiw/codemirror-theme-github';
import { python } from '@codemirror/lang-python';

interface CodeEditorProps {
  shouldHighlight: boolean;
}

const lineHighlightExtension = EditorView.decorations.compute([], (state) => {
  const builder = new RangeSetBuilder<Decoration>();
  const yellowLineNumbers = [1, 2, 12, 14, 15, 21, 33, 34];
  const redLineNumbers = [9, 10, 16, 17, 25, 28];
  const greenLineNumbers = [4, 5, 8, 23, 25, 30];

  for (let i = 1; i <= state.doc.lines; i++) {
    if (yellowLineNumbers.includes(i)) {
      const line = state.doc.line(i);
      const decoration = Decoration.line({ class: 'yellow-line' });
      builder.add(line.from, line.from, decoration);
      continue;
    }

    if (redLineNumbers.includes(i)) {
      const line = state.doc.line(i);
      const decoration = Decoration.line({ class: 'red-line' });
      builder.add(line.from, line.from, decoration);
      continue;
    }

    if (greenLineNumbers.includes(i)) {
      const line = state.doc.line(i);
      const decoration = Decoration.line({ class: 'green-line' });
      builder.add(line.from, line.from, decoration);
      continue;
    }
  }

  return builder.finish();
});


const CodeEditor: React.FC<CodeEditorProps> = ({ shouldHighlight }) => {
  const [code, setCode] = React.useState<string>(
    `def max_subarray_sum_after_one_square(nums):
    n = len(nums)
    
    if n == 0:
        return 0
    
    # Initialize variables
    max_ending_here = nums[0]
    max_with_square_ending_here = nums[0] ** 2
    global_max = max(max_ending_here, max_with_square_ending_here)
    
    for i in range(1, n):
        # Update max_ending_here
        if max_ending_here > 0:
            max_ending_here += nums[i]
        else:
            max_ending_here = nums[i]
        
        # Update max_with_square_ending_here
        # Option 1: Continue the subarray without squaring
        max_with_square_continue = max_ending_here + nums[i] ** 2
        # Option 2: Start a new subarray with squaring
        max_with_square_start = nums[i] ** 2
        # Option 3: Continue the subarray with the previous square
        max_with_square_ending_here = max(max_with_square_ending_here + nums[i], max_with_square_continue, max_with_square_start)
        
        # Update the global maximum
        global_max = max(global_max, max_ending_here, max_with_square_ending_here)
    
    return global_max

# Example usage:
print(max_subarray_sum_after_one_square([2, -1, -4, -3]))  # Output: 17
print(max_subarray_sum_after_one_square([1, -1, 1, 1, -1, -1, 1]))  # Output: 4`
  );

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <Box>
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: 2,
          backgroundColor: '#f5f5f5',
          textAlign: 'start'
        }}
      >
        <CodeMirror
          value={code}
          height="500px"
          theme={githubLight}
          onChange={handleCodeChange}
          extensions={[python(), EditorView.editable.of(false), ...(shouldHighlight ? [lineHighlightExtension] : [])]}
        />
      </Box>
    </Box>
  );
};

export default CodeEditor;
