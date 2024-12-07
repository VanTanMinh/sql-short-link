const form = document.getElementById('linkForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const long_url = document.getElementById('long_url').value;

  fetch('/search', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ long_url })
  })
  .then(response => response.json())
  .then(data => {
    resultDiv.innerHTML = '<h2>Kết quả:</h2>';
    if (data.error) {
      resultDiv.innerHTML += `<p>${data.error}</p>`;
    } else {
      const table = document.createElement('table');
      // Tạo header cho bảng
      const headerRow = table.insertRow();
      if (data.length > 0) {
        Object.keys(data[0]).forEach(key => {
          const headerCell = headerRow.insertCell();
          headerCell.textContent = key;
        });
      }
      // Thêm dữ liệu vào bảng
      data.forEach(row => {
        const dataRow = table.insertRow();
        Object.values(row).forEach(value => {
          const dataCell = dataRow.insertCell();
          dataCell.textContent = value;
        });
      });
      resultDiv.appendChild(table);
    }
  })
  .catch(error => {
    console.error('Lỗi:', error);
    resultDiv.innerHTML = '<p>Lỗi khi thực hiện truy vấn.</p>';
  });
});