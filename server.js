const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'server', // Thay đổi username cho phù hợp
  password: 'Tanminh2009@#',  // Thay đổi password cho phù hợp
  database: 'server' // Thay đổi tên database cho phù hợp
});

db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu:', err);
    return;
  }
  console.log('Kết nối cơ sở dữ liệu thành công!');
});

app.use(express.static('public'));
app.use(express.json());

app.post('/search', (req, res) => {
  const searchType = req.body.searchType;
  const searchValue = req.body.searchValue;

  let query;
  let values;

  if (searchType === "id") {
    const numId = parseInt(searchValue);
    if (isNaN(numId)) {
      return res.json({ error: "ID phải là số" });
    }
    query = `SELECT * FROM links WHERE id = ?`;
    values = [numId];
  } else {
    query = `SELECT * FROM links WHERE ${searchType} LIKE ?`;
    values = [`%${searchValue}%`];
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      res.json({ error: err.message });
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});