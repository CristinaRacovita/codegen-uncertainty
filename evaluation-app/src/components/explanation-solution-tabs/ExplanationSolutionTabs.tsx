import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CodeEditor from '../code-editor/CodeEditor';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface ExplanationSolutionTabsProps {
  mode: number;
}

export default function ExplanationSolutionTabs({ mode }: ExplanationSolutionTabsProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={mode} aria-label="basic tabs example">
          {mode === 0 && (
            <Tab sx={{ color: '#203568', textTransform: 'none', fontWeight: 'bold', '&:hover': { color: '#01adee' }, '&.Mui-selected': { color: '#01adee' } }} label="Code Without AI Hints" {...a11yProps(0)} />
          )}
          {mode === 1 && (
            <Tab sx={{ color: '#203568', textTransform: 'none', fontWeight: 'bold', '&:hover': { color: '#01adee' }, '&.Mui-selected': { color: '#01adee' } }} label="Code With AI Hints" {...a11yProps(1)} />
          )}
        </Tabs>
      </Box>

      <CustomTabPanel value={mode} index={mode}>
        <CodeEditor shouldHighlight={mode === 1} />
      </CustomTabPanel>
    </Box>
  );
}