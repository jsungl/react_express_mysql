import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useSearchParams, useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
    const [params, setParams] = useSearchParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const searchText = useRef(null); //검색 TextField enter 입력시 focus out

    console.log('@@@@page,align,keyword,target :',Number(params.get('page')),params.get('align'),params.get('search_keyword'),params.get('search_target'));
    const queryTarget = params.get('search_target') || 'title_content';
    const queryKeyword = params.get('search_keyword') || '';
    const [target,setTarget] = useState(queryTarget);
    const [keyword,setKeyword] = useState(queryKeyword);

    useEffect(() => {
        console.log('@@@@Layout useEffect call!');
        setTarget(queryTarget);
        setKeyword(queryKeyword);
    },[queryTarget,queryKeyword]);
    
    const searchKeyword = (event) => {
        event.preventDefault();
        searchText.current.blur();
        console.log('target: ',target);
        console.log('keyword: ',keyword);
        if(pathname === '/') {
            navigate({
                pathname: '/list',
                search:`?${createSearchParams({
                    search_target: target,
                    search_keyword: keyword
                })}`
            });
        } else if(pathname === '/list'){
            // /list
            setParams({search_target:target,search_keyword:keyword});
            console.log('pathname: /list');
        } else {
            // /board
            navigate({
                pathname: '/list',
                search:`?${createSearchParams({
                    search_target: target,
                    search_keyword: keyword
                })}`
            });
        }
        console.log('-------------Search Form Submit------------');
    };

    return (
        <Container sx={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <Header target={target} keyword={keyword} setKeyword={setKeyword} setTarget={setTarget} 
                    searchKeyword={searchKeyword} searchText={searchText}/>
            <Box component="main" sx={{flex:1, mt:"50px", mb:"50px"}}>
                <Outlet context={[params,setParams]}/>
            </Box>
            <Footer />
        </Container>
    );
};

export default Layout;