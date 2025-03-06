import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import logoImage from '../../assets/code_logo.png';
import './Toolbar.css';

const StyledToolbar = styled(Toolbar)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `30px`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    backgroundColor: '#01adee',
    boxShadow: '#01adee',
    padding: '8px 12px',
}));

export default function AppAppBar() {
    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: '28px',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <img src={logoImage} width={40} height={40} />
                            <div className='toolbar-title'>How Sure Is AI in Its Code?</div>
                        </Box>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}