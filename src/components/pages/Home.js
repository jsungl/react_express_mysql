import React, {useState} from 'react';
import axios from 'axios';
import Topic from '../topic';
import BoardTable from '../Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Footer from '../Footer';

export default function Home() {
    const [data, setData] = useState([]);
    const title = 'Board';

    const onIncrease = async() => {
        const res = await axios.get('/topic');
        setData([...res.data.topic]);
    }

    const AppBlock = styled.div`
        margin-top: 2rem;
        margin-bottom: 2rem;
    `;

    return (
        <Container fixed>
            <Header title={title}></Header>
            <AppBlock>
                {data.map(data => <Topic topics={data} key={data.id} />)}
                <Button variant="outlined" size="small" onClick={onIncrease}>connect to server</Button>
            </AppBlock>
            <BoardTable></BoardTable>
            <Footer></Footer>
        </Container>
    );
}