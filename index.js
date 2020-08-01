const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todo_api',
    password: 'password'
});

app.get('/api/todos', (req, res) => {
    let isFinished = req.query.finished;
    let sql = 'SELECT * FROM todos';
    if (isFinished == 'true') sql += ' WHERE finished_at IS NOT NULL';
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({
            status: 200, 
            data: result
        }));
    });
});

app.get('api/todos', (req, res) => {
    let sql = 'SELECT * FROM todos WHERE finished_at IS NOT NULL';
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({
            status: 200, 
            data: result
        }));
    });
});

app.post('/api/todos', (req, res) => {
    let data = {
        body: req.body.body,
        created_at: new Date(),
    };
    let sql = 'INSERT INTO todos SET ?';
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({
            status: 200,
            data: result
        }));
    });
});

app.put('/api/todos/:id', (req, res) => {
    let data = {finished_at: new Date()};
    let sql = 'UPDATE todos SET ? WHERE id=' + req.params.id; 
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({
            status: 200,
            data: result
        }))
    });
});

app.delete('/api/todos/:id', (req, res) => {
    let sql = 'DELETE FROM todos WHERE id=' + req.params.id; 
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({
            status: 200,
            data: result
        }))
    });
});

app.get('/api/todos/:id', (req, res) => {
    let sql = 'SELECT * FROM todos WHERE id=' + req.params.id; 
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({
            status: 200,
            data: result
        }))
    });
});

app.listen(8000, () => {
    console.log('app listen on port 8000');
});