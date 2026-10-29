const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas (Sử dụng đúng biến MONGODB_URI từ file .env)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Đã kết nối MongoDB thành công.'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// Định nghĩa Schema và Model cho Món ăn (Food)
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);

// --- API ROUTES ---

// 1. GET: Lấy danh sách tất cả món ăn
app.get('/api/foods', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. POST: Thêm món ăn mới
app.post('/api/foods', async (req, res) => {
  try {
    const newFood = new Food(req.body);
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE: Xóa món ăn theo ID
app.delete('/api/foods/:id', async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Không tìm thấy món ăn.' });
    }
    res.json({ message: 'Đã xóa thành công món ăn' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Khởi động Server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});