import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import styles from '../../style/Board.module.css';
import Button from '@mui/material/Button';
import axios from 'axios';

const TopArea = styled.div`
    padding: 10px;
    border-top: 1px solid #ccc; 
    border-bottom: 1px solid #ccc;
    background-color: #fcfcfc; 
`;
const BotArea = styled.div`
    border-bottom: 1px solid #eee;
`

export default function Board() {
    const params = useParams();
    const postId = params.postId;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writer, setWriter] = useState('');
    const [date,setDate] = useState('');
    const [hits,setHits] = useState(0);
    const [up,setUp] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try{
                const res = await axios.get('/boardContent', {
                    // param 으로 postId 값을 넘겨준다.
                    params: {
                        'postId': postId
                    }
                })
                //console.log('res',res);
                setTitle(res.data[0].board_title);
                setContent(res.data[0].board_content);
                setWriter(res.data[0].board_user);
                setDate(res.data[0].enroll_date.substring(0,10));
                setHits(res.data[0].hits);
                setUp(res.data[0].up);

            } catch(e) {
                console.error(e.message)
            }
        };
        fetchData();
    },[postId]);

    return (
        <>  
            <Box>
                <TopArea>
                    <Stack  direction="row" justifyContent="space-between" alignItems="center">
                        <Typography
                            variant="h5"
                            color="inherit"
                            align="left"
                            noWrap
                        >
                            {title}
                        </Typography>
                        <span>{date}</span>
                    </Stack>
                </TopArea>
                <BotArea>
                    <div className={styles.writerDiv}>{writer}</div>
                    <div className={styles.hitsDiv}>
                        <span className={styles.span}>조회 수 <b className={styles.b}>{hits}</b></span>
                        <span className={styles.span}>추천 수 <b className={styles.b}>{up}</b></span>
                        <span className={styles.span}>댓글 <b className={styles.b}>0</b></span>
                    </div>        
                </BotArea>
            </Box>
            <article>
                <div className={styles.articleDiv}>
                    {content}
                </div>
            </article>
            <Box>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                    mt={4}
                >
                    <Button variant="outlined" size="large">수정</Button>
                    <Button variant="outlined" size="large">삭제</Button>
                </Stack>    
            </Box>
        </>
    );
}