import React, {useEffect, useState, useCallback} from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// const datas = [
//     {
//         'id': 1,
//         'title': '제목입니다1',
//         'username': 'user1', 
//         'date': '2022.08.03', 
//         'hits': 34, 
//         'recommendation': 5
//     },
//     {
//         'id': 2,
//         'title': '제목입니다2',
//         'username': 'user2', 
//         'date': '2022.09.15', 
//         'hits': 256, 
//         'recommendation': 55
//     },
//     {
//         'id': 3,
//         'title': '제목입니다3',
//         'username': 'user3', 
//         'date': '2022.10.03', 
//         'hits': 11, 
//         'recommendation': 0
//     }
// ];

const StyledLink = styled(Link)`
    color: black;
`;

export default function BoardList() {

    const [post,setPost] = useState([
        // {
        //     no: '',
        //     title: '',
        //     content: '',
        //     userId: '', 
        //     date: '', 
        //     hits: '', 
        //     up: ''
        // }
    ]);

    const fetchData = useCallback(async() => {
        try {
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
            setPost(prevPost => prevPost.concat(posts));
            console.log('BoardList redering');
        } catch(e){
            console.error(e.message);
        }
    },[]);

    useEffect(() => {
        fetchData();
    },[fetchData]);

    return (
        <Table bordered hover>
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
      </Table>
    )
}