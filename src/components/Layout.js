import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const DivBlock = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const Layout = () => {
    const title = 'Board';


    return (
        <Container sx={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <Header title={title} />
            <Box sx={{flex:1}}>
                <main>
                    <DivBlock>
                        <Outlet />
                    </DivBlock>
                </main>
            </Box>
            <Footer></Footer>
        </Container>
    );
};

export default Layout;