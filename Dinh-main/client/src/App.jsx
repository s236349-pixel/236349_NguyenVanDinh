import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy danh sách món ăn từ Backend
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/foods');
      const data = await response.json();
      if (Array.isArray(data)) {
        setFoods(data);
      }
    } catch (err) {
      console.error('Lỗi tải danh sách:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Thêm món ăn mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/foods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodId: 'F' + Date.now(),
          name,
          category,
          price: Number(price),
        }),
      });
      if (response.ok) {
        setName('');
        setCategory('');
        setPrice('');
        fetchFoods();
        alert('Thêm món ăn thành công!');
      }
    } catch (err) {
      console.error('Lỗi thêm món:', err);
    }
  };

  // Xóa món ăn
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa món này?')) return;
    try {
      const response = await fetch(`/api/foods/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchFoods();
      }
    } catch (err) {
      console.error('Lỗi xóa món:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>Quản lý Món ăn MERN Stack</h1>

      {/* Form thêm món */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Tên món ăn"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '8px', flex: 1 }}
        />
        <input
          type="text"
          placeholder="Loại món"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ padding: '8px', flex: 1 }}
        />
        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ padding: '8px', width: '100px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Thêm
        </button>
      </form>

      <h2>Danh sách món ăn</h2>
      {loading ? <p>Đang tải...</p> : null}

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th>Tên món</th>
            <th>Loại</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {foods.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Chưa có món ăn nào.</td>
            </tr>
          ) : (
            foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category}</td>
                <td>{food.price}</td>
                <td>
                  <button onClick={() => handleDelete(food._id)} style={{ color: 'red', cursor: 'pointer' }}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;