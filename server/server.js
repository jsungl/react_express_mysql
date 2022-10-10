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

//전체 게시글 조회 
app.get('/boardList',(req, res) => {
  db.query('SELECT * FROM board',(err, data) => {
    if(!err){
        res.send(data);
    } else {
        res.send(err);
    }
  })
})

//특정 게시글 조회
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