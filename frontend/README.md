Sistem Informasi Data Kependudukan Desa

Deskripsi Aplikasi

Sistem Informasi Data Kependudukan Desa merupakan aplikasi berbasis web (Full-Stack) yang digunakan untuk mengelola data kependudukan secara digital. Aplikasi ini dibangun menggunakan React.js sebagai frontend, Express.js sebagai backend, serta MySQL sebagai database.

Aplikasi memiliki dua fitur utama yang saling berelasi, yaitu:

* CRUD Data Kartu Keluarga
* CRUD Data Penduduk

Data penduduk terhubung dengan data kartu keluarga melalui relasi database sehingga memudahkan proses pengelolaan data.

Teknologi yang Digunakan

* React.js (Frontend)
* Express.js (Backend)
* MySQL (Database)
* Axios
* Node.js

Cara Menjalankan Backend

1. Buka Terminal.
2. Masuk ke folder backend.
cd backend
3. Install dependency.
npm install
4. Jalankan server.
npm run dev
Server akan berjalan pada:
http://localhost:5001

Cara Menjalankan Frontend

1. Buka Terminal baru.
2. Masuk ke folder frontend.
cd frontend
3. Install dependency.
npm install
4. Jalankan aplikasi.
npm run dev
Frontend akan berjalan pada:
http://localhost:5173