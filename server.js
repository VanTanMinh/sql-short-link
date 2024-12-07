const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Thay đổi thông tin kết nối cơ sở dữ liệu cho phù hợp
const db = mysql.createConnection({
  host: 'localhost',
  user: 'server',
  password: 'Tanminh2009@#',
  database: 'server'
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
    const long_url = req.body.long_url;
    const query = `SELECT * FROM links WHERE long_url LIKE ?`;
    db.query(query, [`%${long_url}%`], (err, result) => {
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