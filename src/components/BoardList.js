import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
//import Pagination from './Pagination';
import Pagination from 'react-js-pagination';
import '../style/pagination.css';
import Grid from '@mui/material/Grid';

const StyledLink = styled(Link)`
    color: black;
`;

const StyledTable = styled(Table)`
    border-top: 2px solid rgba(0, 0, 0, 0.12); 
    border-bottom: 2px solid rgba(0, 0, 0, 0.12); 
`;

export default function BoardList() {
    const [post,setPost] = useState([]); //데이터 목록
    const [align, setAlign] = useState('board_no'); //정렬방법(기본값 최신순)
    const [keyword,setKeyword] = useState(''); //검색어
    const [target,setTarget] = useState('title_content'); //검색 방법(기본값 제목+내용)
    const [currentPage, setCurrentPage] = useState(1); //현재 페이지
    const postPerPage = 10; //페이지당 보여줄 데이터 개수
    const [totalCount,setTotalCount] = useState(0); //보여줄 데이터 개수
    const searchText = useRef(null); //검색 TextField enter 입력시 focus out
    //const [loading, setLoading] = useState(true);

    const tdStyle = {
        textAlign:'center',
        padding:30
    }

    console.log('----------------Rendering----------------');
    
    
    //처음 컴포넌트가 마운트될 때 한번 호출
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/totalCount');
                res.data[0].map(rowData => setTotalCount(rowData.count));
                const posts = await res.data[1].map(rowData => (
                    {
                        no: rowData.board_no,
                        title: rowData.board_title,
                        content: rowData.board_content,
                        userId: rowData.board_user, 
                        date: rowData.enroll_date.substring(0,10), 
                        hits: rowData.hits, 
                        up: rowData.up
                    }
                ));
                setPost(posts);
                console.log('--------------Redering Init--------------');
            } catch(e){
                console.error(e.message);
            }
        }
        fetchData();
    },[]);

    //정렬 select 선택시 호출되는 함수
    const onChangeAlign = useCallback(async(event) => {
        try {
            const res = await axios.get('/boardList',{
                params:{
                    'align': event.target.value,
                    'offset': 0,
                    'limit': postPerPage,
                    'keyword': keyword.toLowerCase().replace(' ', ''),
                    'target': target
                }
            });
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
            ));
            setPost(posts);
            setAlign(event.target.value);
            setCurrentPage(1);
            console.log('----------------Redering Align Change----------------');
        } catch(e){
            console.error(e.message);
        }
    },[target,keyword]);

    //검색 필드(textfield) 값 변경될 때마다 호출
    const onChangeInput = useCallback((event) => {
        setKeyword(event.target.value);
    },[]);

    //검색 select 선택시 호출되는 함수
    const onChangeTarget = useCallback((event) => {
        setTarget(event.target.value);
    },[]);
    
    //페이지 변경시 호출되는 함수
    const onChangePage = useCallback(async(currentPage) => {
        try {
            const res = await axios.get('/boardList',{
                params:{
                    'align': align,
                    'offset': (currentPage-1)*postPerPage,
                    'limit': postPerPage,
                    'keyword': keyword.toLowerCase().replace(' ', ''),
                    'target': target
                }
            });
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
            ));
            setPost(posts);
            setCurrentPage(currentPage);
            console.log('-----------Redering Page Change-----------');
        } catch(e){
            console.error(e.message);
        }
    },[align, target, keyword]);

    //Search Keyword Filter(대소문자, 띄어쓰기 구분)
    // const filterKeyword = useMemo(() => {
    //     return keyword.toLowerCase().replace(' ', '');
    // },[keyword]);
    
    //Search Form Submit
    const searchKeyword = useCallback(async(event) => {
        event.preventDefault();
        searchText.current.blur();
        //console.log('filterKeyword: ',keyword.toLowerCase().replace(' ', ''));
        await axios.get('/boardList',{
            params:{
                'align': 'board_no',
                'offset': 0,
                'limit': postPerPage,
                'keyword': keyword.toLowerCase().replace(' ', ''),
                'target': target
            }
        })
        .then(res => {
            res.data.length === 0 ? setTotalCount(1) : res.data.map(rowData => setTotalCount(rowData.count));
            setPost(res.data.map(rowData => (
                {
                    no: rowData.board_no,
                    title: rowData.board_title,
                    content: rowData.board_content,
                    userId: rowData.board_user, 
                    date: rowData.enroll_date.substring(0,10), 
                    hits: rowData.hits, 
                    up: rowData.up
                }
            )));
            setAlign('board_no');
            setCurrentPage(1);
            console.log('-------------Redering Search Form Submit------------');
        })
        .catch(err => {
            console.log(err)
        });

    },[keyword,target]);
    

    console.log('posts: ', post);
    console.log('totalCount: ', totalCount);
    console.log('align: ', align);
    console.log('keyword: ', keyword);
    console.log('target: ', target);
    console.log('currentPage: ', currentPage);


    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb:2 }}>
                <FormControl sx={{ mr:2, minWidth: 120 }} size="small">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={target}
                        onChange={onChangeTarget}>
                            <MenuItem value={"title_content"}>제목+내용</MenuItem>
                            <MenuItem value={"title"}>제목</MenuItem>
                            <MenuItem value={"content"}>내용</MenuItem>
                            <MenuItem value={"writer"}>글쓴이</MenuItem>
                    </Select>
                </FormControl>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                    onSubmit={searchKeyword}
                >
                    <TextField
                        fullWidth
                        name="search-keyword"
                        placeholder="Search"
                        type="search"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        sx={{ml:1}}
                        onChange={onChangeInput}
                        inputRef={searchText}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>
            {post.length !== 0 ? (
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
                        }
                    </tbody>
                </StyledTable>
            ) : (
                <StyledTable>
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
                    <tr>
                        <td colSpan={6} style={tdStyle}>등록된 글이 없습니다.</td>
                    </tr>
                </tbody>
                </StyledTable>)
            }
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={6} sm="auto">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-simple-select-label">정렬</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={align}
                            label="정렬"
                            onChange={onChangeAlign}>
                                <MenuItem value={"board_no"}>최신순</MenuItem>
                                <MenuItem value={"hits"}>조회순</MenuItem>
                                <MenuItem value={"up"}>인기 많은순</MenuItem>
                                <MenuItem value={"enroll_date"}>오래된순</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                
                <Grid item xs={6} sm="auto">
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{mx:1}}>
                        <Button variant="outlined" size="large">
                            Write
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid 
                container 
                justifyContent="center"
            >
                <Grid item xs={12} sm="auto">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Pagination 
                            activePage={currentPage} // 현재 페이지 번호
                            itemsCountPerPage={postPerPage} // 한 페이지당 보여줄 데이터 갯수
                            totalItemsCount={totalCount} // 총 데이터 갯수
                            pageRangeDisplayed={5} // 한번에 보여줄 페이지 번호 갯수
                            prevPageText={"이전"} // "이전"을 나타낼 텍스트
                            nextPageText={"다음"} // "다음"을 나타낼 텍스트
                            firstPageText={"처음"}
                            lastPageText={"끝"}
                            onChange = {onChangePage} // 페이지 변경시 호출되는 함수
                        />
                    </Box>
                </Grid>    
            </Grid>        
        </>
    )
}