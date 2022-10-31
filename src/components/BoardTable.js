import React from 'react';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    color: black;
`;

const StyledTable = styled(Table)`
    border-top: 2px solid rgba(0, 0, 0, 0.12); 
    border-bottom: 2px solid rgba(0, 0, 0, 0.12); 
`;

export default function BoardTable({post}) {

    const tdStyle = {
        textAlign:'center',
        padding:30
    }

    return (
        <>
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
        </>
    )
}