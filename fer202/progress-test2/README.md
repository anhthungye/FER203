2. Vào thư mục project
cd progress-test2

3. Cài các gói cần thiết
npm install
npm i react-router-dom axios bootstrap react-bootstrap react-icons prop-types

▶️ Chạy ứng dụng
4. Chạy frontend (Vite server)
npm run dev


→ mặc định chạy ở http://localhost:5173/

5. Chạy backend (JSON Server)

npx json-server --watch db.json --port 3001

→ API chạy ở http://localhost:3001

http://localhost:3001/products

http://localhost:3001/accounts

⚠️ Lưu ý

Mở 2 terminal song song:

1 terminal chạy npm run dev (frontend)

1 terminal chạy npx json-server ... (backend)