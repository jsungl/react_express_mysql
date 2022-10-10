import React, {useEffect, useState, useCallback} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const StyledLink = styled(Link)`
    color: black;
`;

const StyledTable = styled(Table)`
    border-top: 2px solid rgba(0, 0, 0, 0.12); 
    border-bottom: 2px solid rgba(0, 0, 0, 0.12); 
`;

export default function BoardList() {

    const [post,setPost] = useState([]);
    const [align, setAlign] = useState(0); //정렬방법에 대한 상태

    const handleChange = (event) => {
        console.log(event.target.value);
        setAlign(event.target.value);
    };

    const fetchData = useCallback(async() => {
        try {
            console.log('align: ',align);
            const res = await axios.get('/boardList');
            const posts = await res.data.map(rowData => (
                {
                    no: rowData.board_no,
                    title: rowData.board_title,
                    content: rowData.board_content,
                    userId: rowData.board_user, 
                    date: rowData.enroll_date.substring(0,10), 
                    hits: rowData.hits, 
                    up: rowData.up
                }
            ))
            //console.log('posts: ',posts);
            //setPost(prevPost => prevPost.concat(posts));
            setPost(posts);
            console.log('BoardList Component Redering');
        } catch(e){
            console.error(e.message);
        }
    },[align]);

    // useEffect(() => {
    //     async function fetchBoardList() {
    //         try {
    //             const res = await axios.get('/boardList');
    //             const posts = await res.data.map(rowData => (
    //                 {
    //                     no: rowData.board_no,
    //                     title: rowData.board_title,
    //                     content: rowData.board_content,
    //                     userId: rowData.board_user, 
    //                     date: rowData.enroll_date.substring(0,10), 
    //                     hits: rowData.hits, 
    //                     up: rowData.up
    //                 }
    //             ))
    //             //console.log('posts: ',posts);
    //             setPost(prevPost => prevPost.concat(posts));
    //             console.log('BoardList Component Redering');
    
    //         }catch(e){
    //             console.error(e.message);
    //         }
    //     };
    //     fetchBoardList();
    // },[post]);

    useEffect(() => {
        fetchData();
    },[fetchData]);



    return (
        <>
            <StyledTable hover>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                        <th>조회수</th>
                        <th>추천수</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        post != null ?
                            post.map(data => (
                                <tr key={data.no}>
                                    <td>{data.no}</td>
                                    <td>
                                        <StyledLink to={`/board/${data.no}`}>{data.title}</StyledLink>
                                    </td>
                                    <td>{data.userId}</td>
                                    <td>{data.date}</td>
                                    <td>{data.hits}</td>
                                    <td>{data.up}</td>
                                </tr>
                            ))
                        :
                        <tr>
                            <td>작성된 글이 없습니다.</td>
                        </tr>
                    }
                </tbody>
        </StyledTable>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">정렬</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={align}
                    label="정렬"
                    onChange={handleChange}>
                        <MenuItem value={0}>최신순</MenuItem>
                        <MenuItem value={1}>조회순</MenuItem>
                        <MenuItem value={2}>인기 많은순</MenuItem>
                        <MenuItem value={3}>오래된순</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button variant="outlined" size="medium">
                Write
            </Button>
        </Stack>
        
      </>
    )
}