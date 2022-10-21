require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT //process.env : 환경변수에 접근시 사용하는 내장 자바스크립트 객체
const db = require('./dbconfig/db');

app.set('view engine', 'ejs');

// app.get('/hello', (req, res) => {
//   res.send({number:1})
// })

// app.get('/hello/:num', (req, res) => {
//   res.render('test',{num:req.params.num})
// })

//게시글 목록 조회(정렬방법,페이징) 
app.get('/boardList',(req, res) => {
  const sql = 'SELECT count(*) count FROM board;'; //데이터 총 개수
  let sql2 = '';
  switch (Number(req.query.align)) {
    case 1:
      //조회순
        sql2 = 'SELECT * FROM board ORDER BY hits desc limit ? offset ?';   
        break;
    case 2:
      //추천순
        sql2 = 'SELECT * FROM board ORDER BY up desc limit ? offset ?';
        break;
    case 3:
      //오래된순
        sql2 = 'SELECT * FROM board ORDER BY enroll_date limit ? offset ?';
        break;
    default:
        //sql = `SELECT * FROM board ORDER BY board_no desc limit ${Number(req.query.limit)} offset ${Number(req.query.offset)}`;
        sql2 = 'SELECT * FROM board ORDER BY board_no desc limit ? offset ?';
        break;
  }
  db.query(sql+sql2,[Number(req.query.limit),Number(req.query.offset)],(err, data) => {
    if(!err){
        //console.log(data);
        res.send(data);
    } else {
        res.send(err);
    }
  })
})

//특정 게시글 조회(상세보기)
app.get('/boardContent',(req, res) => {
  db.query('SELECT * FROM board WHERE board_no = ?',[req.query.postId],(err, data) => {
    if(!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  })
})

//검색
app.get('/search',(req,res) => {
  let sql = '';
  const keyword = '%' + req.query.keyword + '%';
  switch (req.query.target) {
    case 'title':
      //제목
        sql = 'SELECT * FROM board WHERE board_title like ? ORDER BY board_no desc';   
        break;
    case 'content':
      //내용
        sql = 'SELECT * FROM board WHERE board_content like ? ORDER BY board_no desc';
        break;
    case 'writer':
      //글쓴이
        sql = 'SELECT * FROM board WHERE board_user like ? ORDER BY board_no desc';
        break;
    default:
        //제목+내용
        sql = 'SELECT * FROM board WHERE board_title like ? OR board_content like ? ORDER BY board_no desc';
        break;
  }
  db.query(sql,[keyword,keyword],(err, data) => {
    if(!err) {
      //console.log(data);
      res.send(data);
    } else {
      //console.log(err);
      res.send(err);
    }
  })
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})