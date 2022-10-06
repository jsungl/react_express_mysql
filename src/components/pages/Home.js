import React from 'react';
//import axios from 'axios';
//import Topic from '../topic';
import BoardList from '../BoardList';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from '@mui/material/Button';

export default function Home() {
    // const [data, setData] = useState([]);
    // const title = 'Board';

    // const onIncrease = async() => {
    //     const res = await axios.get('/topic');
    //     setData([...res.data.topic]);
    // }

    return (
        <BoardList></BoardList>
    );
}