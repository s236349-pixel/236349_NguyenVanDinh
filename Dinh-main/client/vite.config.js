import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true, // Ép buộc chạy đúng cổng 5174, nếu bận sẽ báo lỗi thay vì tự đổi cổng ngẫu nhiên
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})