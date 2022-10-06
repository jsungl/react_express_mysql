import React from 'react';
import { useParams } from 'react-router-dom';

export default function Board() {
    const params = useParams();
    //const postId = params.postId;
    const postTitle = params.postTitle;
    //const { title } = props;

    return (
        <>
            <h2>{postTitle}</h2>
        </>
    );
}