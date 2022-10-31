import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';


export default function BoardBar({onClickHome,onChangeAlign,align}) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const alignItems = [
        {name:'board_no',role:'최신순'},
        {name:'hits',role:'조회순'},
        {name:'up',role:'추천순'},
        {name:'enroll_date',role:'오래된순'}
    ];

    //정렬 버튼 클릭시 호출
    const onClickAlign = (event) => {
        onChangeAlign(event.target.dataset.name);
    };
    
    //Nav Menu(햄버거버튼) 열 때 호출
    const onClickNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    //Nav Menu(햄버거버튼) 닫을 때 호출
    const onCloseNavMenu = (event) => {
        setAnchorElNav(null);
        if (event.currentTarget.dataset.name !== undefined) {
            onChangeAlign(event.currentTarget.dataset.name);
        }
    };

    return (
        <AppBar position="static" color="transparent" sx={{ flexGrow: 1 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <IconButton
                        onClick={()=>{
                            setAnchorElNav(null);
                            onClickHome();
                        }}
                        sx={{
                            display: { xs: 'none', sm: 'flex', md: 'flex' },
                            mr: 3,
                        }}
                    >
                        <SvgIcon>
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </SvgIcon>
                    </IconButton>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'flex', md: 'flex' },
                            boxShadow: '-1px 0 2px #ddd',
                        }}
                    >
                        {alignItems.map((item) => (
                            <Button
                                key={item.name}
                                onClick={onClickAlign}
                                sx={{
                                    my: 2,
                                    color: (align || 'board_no') === item.name ? '#0A0DB5' : '#444',
                                    display: 'block',
                                    fontWeight:'bold'
                                }}
                                data-name={item.name}
                            >
                                {item.role}
                            </Button>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', sm: 'none', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={onClickNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={onCloseNavMenu}
                            sx={{
                                display: { xs: 'block', sm:'none', md: 'none' },
                            }}
                        >
                            <MenuItem key={'home'} onClick={()=>{
                                    setAnchorElNav(null);
                                    onClickHome();
                                }} 
                                data-name={'board_no'} sx={{justifyContent:'center'}}
                            >
                                <Typography align='center' sx={{fontWeight:'bold'}}>Home</Typography>
                            </MenuItem>
                            {alignItems.map((item) => (
                                <MenuItem
                                    key={item.name}
                                    onClick={onCloseNavMenu}
                                    data-name={item.name}
                                    sx={{ color: (align || 'board_no') === item.name ? '#0A0DB5' : '#444',justifyContent:'center' }}
                                >
                                    <Typography align='center' sx={{fontWeight:'bold'}}>{item.role}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Button variant="outlined" size="large">WRITE</Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}