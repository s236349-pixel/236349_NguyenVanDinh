# 236349_NguyenVanDinh

## 1. Giới thiệu đề tài
Xây dựng ứng dụng quản lý món ăn gồm giao diện frontend, backend API và cơ sở dữ liệu MongoDB Atlas.

## 2. Công nghệ sử dụng
- Frontend: React, Vite
- Backend: Node.js, Express
- Cơ sở dữ liệu: MongoDB Atlas
- Quản lý mã nguồn: Git, GitHub
- Đóng gói ứng dụng: Docker
- Triển khai: Render

## 3. Cấu trúc dự án
Dinh-main/
├── client/              # Giao diện frontend
├── server/              # Backend API
├── .gitignore           # Các tệp không đưa lên Git
├── README.md            # Tài liệu dự án
├── docker-compose.yml
├── docker-compose.hub.yml
├── nginx.conf
├── package.json
└── package-lock.json

## 4. Cài đặt và chạy chương trình

### Backend
1. Cài đặt Node.js.
2. Mở Terminal tại thư mục `server`.
3. Chạy `npm install`.
4. Tạo tệp `.env` trên máy cá nhân và cấu hình `PORT` cùng `MONGODB_URI`.
5. Chạy lệnh `npm start` hoặc lệnh tương ứng được khai báo trong `server/package.json`.

### Frontend
1. Mở Terminal tại thư mục `client`.
2. Chạy `npm install`.
3. Chạy `npm run dev`.
4. Mở địa chỉ localhost được Vite hiển thị trong Terminal.

## 5. Bảo mật
Không đưa tệp `.env`, mật khẩu, access token hoặc thông tin kết nối bí mật lên GitHub. Các thông tin cấu hình cần được lưu trong biến môi trường.
