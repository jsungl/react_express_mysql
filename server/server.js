require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT //process.env : 환경변수에 접근시 사용하는 내장 자바스크립트 객체
const db = require('./dbconfig/db');

app.set('view engine', 'ejs');

app.get('/hello', (req, res) => {
  res.send({number:1})
})

app.get('/hello/:num', (req, res) => {
  res.render('test',{num:req.params.num})
})

app.get('/topic', (req, res) => {
    db.query('SELECT * FROM topic_backup',(err, data) => {
        if(!err){
            res.send({topic:data});
        } else {
            res.send(err);
        }
    })
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})