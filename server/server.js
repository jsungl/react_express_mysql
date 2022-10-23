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

//데이터 총 개수, 1번째 페이지(0~10) 데이터 조회
app.get('/totalCount',(req, res) => {
  const sql1 = 'SELECT count(*) count FROM board;';
  const sql2 = 'SELECT * FROM board limit 10 offset 0';
  db.query(sql1+sql2,(err, data) => {
    if(!err){
        res.send(data);
    } else {
        res.send(err);
    }
  })
})

//데이터 목록 조회(정렬방법, 검색방법, 페이징) 
app.get('/boardList',(req, res) => {
  let mainSQL = '';
  let subSQL = 'SELECT count(*) FROM board';
  const keyword = '%' + req.query.keyword + '%';
  switch (req.query.target) {
    case 'title':
        //제목
        subSQL += ` WHERE board_title like ${db.escape(keyword)}`;    
        mainSQL = 'SELECT *,(' + subSQL + `) count FROM board WHERE board_title like ${db.escape(keyword)}`;
        break;
    case 'content':
        //내용
        subSQL += ` WHERE board_content like ${db.escape(keyword)}`;
        mainSQL = 'SELECT *,(' + subSQL + `) count FROM board WHERE board_content like ${db.escape(keyword)}`;
        break;
    case 'writer':
        //글쓴이     
        subSQL += ` WHERE board_user like ${db.escape(keyword)}`;
        mainSQL = 'SELECT *,(' + subSQL + `) count FROM board WHERE board_user like ${db.escape(keyword)}`;
        break;
    default:
        //제목+내용
        subSQL += ` WHERE board_title like ${db.escape(keyword)} OR board_content like ${db.escape(keyword)}`;
        mainSQL = 'SELECT *,(' + subSQL + `) count FROM board WHERE board_title like ${db.escape(keyword)} OR board_content like ${db.escape(keyword)}`;
        break;
  }

  switch(req.query.align) {
    case 'hits':
        //조회수
        mainSQL += ' ORDER BY hits desc,board_no desc limit ? offset ?';
        break;
    case 'up':
        //추천순
        mainSQL += ' ORDER BY up desc,board_no desc limit ? offset ?';
        break;
    case 'enroll_date':
        //오래된순
        mainSQL += ' ORDER BY board_no limit ? offset ?';
        break;
    default:
        //최신순
        mainSQL += ' ORDER BY board_no desc limit ? offset ?';
        break;
  }
  console.log(mainSQL);

  db.query(mainSQL,[Number(req.query.limit),Number(req.query.offset)],(err, data) => {
    if(!err){
      res.send(data);
    } else {
      res.send(err);
    }
  })
})

//특정 데이터 조회(상세보기)
app.get('/boardContent',(req, res) => {
  db.query('SELECT * FROM board WHERE board_no = ?',[req.query.postId],(err, data) => {
    if(!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})