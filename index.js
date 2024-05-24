const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '07698539350',
  database : 'teste_api'
});

db.connect(err => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados: ', err);
      return;
    }
    console.log('Conectado ao banco de dados MySQL');
  });

app.get('/', (req, res) => {
  res.send('Olá, API em desenvolvimento!')
})

app.get('/allcats', (req, res) => {
    const sql = 'SELECT * FROM gatinho';

    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(results);
    });
  });

app.get('/cat/:id', (req, res) => {

    const id = req.params.id;
    const sql = `SELECT * FROM gatinho WHERE id = ${id}`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({error: err});
        }
        res.json(results)
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
