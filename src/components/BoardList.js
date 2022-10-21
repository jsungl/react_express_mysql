import React, {useEffect, useState, useCallback} from 'react';
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
    const [align, setAlign] = useState(0); //정렬방법(기본값 최신순)
    const [target,setTarget] = useState("title_content"); //검색 방법(기본값 제목+내용)
    
    //const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); //현재 페이지
    //const [postPerPage] = useState(10); 
    const postPerPage = 10; //페이지당 보여줄 데이터 개수
    const [totalCount,setTotalCount] = useState(0); //전체 데이터 개수
    //let totalCount = 0;
    const [keyword,setKeyword] = useState(""); //검색어
    
    //처음 컴포넌트가 마운트될 때 호출
    const fetchData = useCallback(async() => {
        try {
            //console.log('align: ',align);
            //console.log('target: ',target);
            const res = await axios.get('/boardList',
                {
                    params:{
                        'align': 0,
                        'offset': 0,
                        'limit': postPerPage
                    }
                
                }
            );
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
            //setPost(prevPost => prevPost.concat(posts));
            setPost(posts);
            console.log('BoardList Component Redering');
        } catch(e){
            console.error(e.message);
        }
    },[]);

    useEffect(() => {
        fetchData();
    },[fetchData]);

     //정렬 select 선택시 호출되는 함수
    const handleChangeAlign = (event) => {
        setAlign(event.target.value);
    };

    //검색 select 선택시 호출되는 함수
    const handleChangeTarget = (event) => {
        setTarget(event.target.value);
    };
    
    //페이지 번호 변경시 호출되는 함수
    const handlePageChange = (currentPage) => {
        setCurrentPage(currentPage);
        //console.log('Page Change ', currentPage);
    };

    //페이지 번호,정렬방법이 변경될 때마다 DB로부터 데이터 가져오기(10개씩)
    useEffect(() => {
        //console.log('currentPage: ',currentPage);
        (async () => {
            const res = await axios.get('/boardList',{
                params:{
                    'align': align,
                    'offset': (currentPage-1)*postPerPage,
                    'limit': postPerPage
                }
            });
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
        })();
    },[currentPage,align])

    const searchKeyword = async(e) => {
        e.preventDefault();
        if(keyword === null || keyword === ""){
          console.log("검색어를 입력하세요");
        } else {
            console.log('keyword: ',keyword);
            console.log('target: ',target);
            const res = await axios.get('/search',{
                params:{
                    'target': target,
                    'keyword': keyword
                }
            });  
            console.log('검색 결과: ',res.data);
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
        }
    }
    //검색 필드(textfield) 값 변경될 때마다 호출
    const handleChangeInput = (e) => {
        setKeyword(e.target.value);
    }

    /* 
        const indexOfLastRecord = currentPage * postPerPage; //페이지의 마지막 데이터 index, ex) 1페이지 마지막 데이터 index는 10 
        const indexOfFirstRecord = indexOfLastRecord - postPerPage; //페이지의 첫번째 데이터 index, ex) 1페이지 첫번째 데이터 index는 0
        const currentRecords = post.slice(indexOfFirstRecord, indexOfLastRecord); //0~9, 10~19, ...
        console.log('currentRecords ',currentRecords);
        const nPages = Math.ceil(post.length / postPerPage); //페이지 번호 총 개수 
    */

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb:2 }}>
                <FormControl sx={{ mr:2, minWidth: 120 }} size="small">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={target}
                        onChange={handleChangeTarget}>
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
                        onChange={handleChangeInput}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }}>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>
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
                        post !== null ?
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
                            onChange={handleChangeAlign}>
                                <MenuItem value={0}>최신순</MenuItem>
                                <MenuItem value={1}>조회순</MenuItem>
                                <MenuItem value={2}>인기 많은순</MenuItem>
                                <MenuItem value={3}>오래된순</MenuItem>
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
                            onChange={handlePageChange} // 페이지 변경시 호출되는 함수
                        />
                    </Box>
                </Grid>    
            </Grid>        
        </>
    )
}