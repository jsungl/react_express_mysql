import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../style/header.css';

const customTheme = createTheme({
    palette: {
      
      primary: {
        main: '#337ab7',
      },
    },
});

export default function Header(props) {
    const { title } = props;
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    return (
        <Box component="header">
            {/* <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h3"
                    color="inherit"
                    align="left"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    {title}
                </Typography>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" size="small">
                        Join
                    </Button>
                    <Button variant="contained" size="small">
                        Login
                    </Button>
                </Stack>
            </Toolbar> */}
            <ThemeProvider theme={customTheme}>
                <AppBar position="static" sx={{ flexGrow: 1 }} elevation={0}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    // display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Anton',
                                    fontWeight: 400,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}
                            >
                                {title}
                            </Typography>
                            <Box sx={{ flexGrow: 1 }}/>
                            <Box sx={{ flexGrow: 0 }}>
                                <IconButton
                                    size="medium"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    sx={{
                                        '&:hover': {
                                            backgroundColor:'transparent'
                                        }
                                    }}
                                >
                                    <Avatar src="/broken-image.jpg" />
                                    {/* <AccountCircle/> */}
                                </IconButton>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem key={'login'} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">LOGIN</Typography>
                                    </MenuItem>
                                    <MenuItem key={'join'} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">JOIN</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}