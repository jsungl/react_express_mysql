import React, {useEffect, useState} from 'react';
//import { useNavigate, useSearchParams, createSearchParams, useOutletContext } from 'react-router-dom';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../Pagination';
import Table from '../BoardTable';
import BoardBar from '../BoardBar';
//import SearchBar from '../SearchBar';


export default function Home() {
    const [params] = useOutletContext();
    //const [params] = useSearchParams();
    const queryTarget = params.get('search_target') === null ? 'title_content' : params.get('search_target');
    const queryKeyword = params.get('search_keyword') === null ? '' : params.get('search_keyword');
    const align = params.get('align') === null ? 'board_no' : params.get('align');
    const currentPage = params.get('page') === null ? 1 : params.get('page');
    const [post,setPost] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    // const [keyword,setKeyword] = useState(queryKeyword);
    // const [target,setTarget] = useState(queryTarget);
    const postPerPage = 10; //페이지당 보여줄 데이터 개수
    
    const navigate = useNavigate();

    console.log('=========Home Component Rendering=========');

    //처음 컴포넌트가 마운트될 때 한번 호출
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/totalCount');
                res.data[0].map(rowData => 
                    setTotalCount(rowData.count)
                );
                
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
                console.log('------------Home Redering Init------------');
            } catch(e){
                console.error(e.message);
            }
        }
        fetchData();
    },[]);

    //정렬 select 선택시 호출
    const onChangeAlign = (pageAlign) => {
        navigate({
            pathname: '/list',
            search: `align=${pageAlign}`,
        });
        console.log('----------Align Change----------');
    };

    //검색 필드(textfield) 값 변경될 때마다 호출
    // const onChangeInput = (event) => {
    //     setKeyword(event.target.value);
    // };

    //검색 select 선택시 호출
    // const onChangeTarget = (event) => {
    //     setTarget(event.target.value);
    // };
    
    //페이지 변경시 호출
    const onChangePage = (nextPage) => {
        navigate({
            pathname: '/list',
            search: `page=${nextPage}`,
        });
        console.log('-----------Page Change----------');
    };

    //홈 버튼 클릭시 호출(햄버거 메뉴 버튼에서 홈 선택시에도 호출)
    const onClickHome = () => {
        window.location.reload(); //새로고침
    };
    
    //검색 form 전송시 호출
    // const searchKeyword = (event) => {
    //     event.preventDefault();
    //     searchText.current.blur();
    //     navigate({
    //         pathname: '/list',
    //         search:`?${createSearchParams({
    //             search_target: target,
    //             search_keyword: keyword
    //         })}`
    //     });
    //     console.log('-------------Search Form Submit------------');
    // };
    

    console.log('posts: ', post);
    console.log('totalCount: ', totalCount);
    console.log('align: ', align);
    console.log('keyword: ', queryKeyword);
    console.log('target: ', queryTarget);
    console.log('currentPage: ', currentPage);

    return (
            <>
                {/* <SearchBar target={target} searchKeyword={searchKeyword} searchText={searchText} onChangeTarget={onChangeTarget} onChangeInput={onChangeInput}/> */}
                <BoardBar onClickHome={onClickHome} onChangeAlign={onChangeAlign} align={align}/>

                <Table post={post}/>
            
                <Pagination page={currentPage} totalCount={totalCount} postPerPage={postPerPage} onChangePage={onChangePage}/>
            </>
    );
}