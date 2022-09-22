const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const db = require('./dbconfig/db');

app.get('/hello', (req, res) => {
  res.send({number:1})
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