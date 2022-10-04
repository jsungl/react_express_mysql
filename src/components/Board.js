import React from 'react';
import Table from 'react-bootstrap/Table';

const datas = [
    {
        'id': 1,
        'title': '제목입니다1',
        'username': 'user1', 
        'date': '2022.08.03', 
        'hits': 34, 
        'recommendation': 5
    },
    {
        'id': 2,
        'title': '제목입니다2',
        'username': 'user2', 
        'date': '2022.09.15', 
        'hits': 256, 
        'recommendation': 55
    },
    {
        'id': 3,
        'title': '제목입니다3',
        'username': 'user3', 
        'date': '2022.10.03', 
        'hits': 11, 
        'recommendation': 0
    }
];

export default function BoardTable() {

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
                {datas.map(data => (
                    
                    <tr key={data.id}>
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                        <td>{data.username}</td>
                        <td>{data.date}</td>
                        <td>{data.hits}</td>
                        <td>{data.recommendation}</td>
                    </tr>
                    
                ))}
            </tbody>
      </Table>
    )
}