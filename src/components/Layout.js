import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
    const title = 'Board';

    return (
        <Container sx={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <Header title={title} />
            <Box component="main" sx={{flex:1, mt:"30px", mb:"30px"}}>
                <Outlet />
            </Box>
            <Footer></Footer>
        </Container>
    );
};

export default Layout;