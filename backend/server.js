const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Koneksi Database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Berhasil terhubung ke MySQL");
  }
});

// Route Utama
app.get("/", (req, res) => {
  res.send("Backend Sistem Informasi Data Kependudukan Berjalan!");
});


// =======================
// CRUD KARTU KELUARGA
// =======================

// GET
app.get("/api/kartu-keluarga", (req, res) => {
  db.query("SELECT * FROM kartu_keluarga", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

// POST
app.post("/api/kartu-keluarga", (req, res) => {
  const {
    no_kk,
    kepala_keluarga,
    alamat,
    rt,
    rw,
    desa,
    kecamatan,
    kabupaten,
  } = req.body;

  const sql = `
    INSERT INTO kartu_keluarga
    (no_kk, kepala_keluarga, alamat, rt, rw, desa, kecamatan, kabupaten)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      no_kk,
      kepala_keluarga,
      alamat,
      rt,
      rw,
      desa,
      kecamatan,
      kabupaten,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Data berhasil ditambahkan",
      });
    }
  );
});

// PUT
app.put("/api/kartu-keluarga/:id", (req, res) => {
  const { id } = req.params;

  const {
    no_kk,
    kepala_keluarga,
    alamat,
    rt,
    rw,
    desa,
    kecamatan,
    kabupaten,
  } = req.body;

  const sql = `
    UPDATE kartu_keluarga
    SET
    no_kk=?,
    kepala_keluarga=?,
    alamat=?,
    rt=?,
    rw=?,
    desa=?,
    kecamatan=?,
    kabupaten=?
    WHERE id_kk=?
  `;

  db.query(
    sql,
    [
      no_kk,
      kepala_keluarga,
      alamat,
      rt,
      rw,
      desa,
      kecamatan,
      kabupaten,
      id,
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Data berhasil diubah",
      });
    }
  );
});

// DELETE
app.delete("/api/kartu-keluarga/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM kartu_keluarga WHERE id_kk=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Data berhasil dihapus",
      });
    }
  );
});

// =======================
// CRUD PENDUDUK
// =======================

// GET
app.get("/api/penduduk", (req, res) => {
  const sql = `
    SELECT penduduk.*, kartu_keluarga.no_kk
    FROM penduduk
    LEFT JOIN kartu_keluarga ON penduduk.id_kk = kartu_keluarga.id_kk
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST
app.post("/api/penduduk", (req, res) => {
  const {
    id_kk,
    nik,
    nama,
    jenis_kelamin,
    tempat_lahir,
    tanggal_lahir,
    agama,
    pekerjaan,
    status_perkawinan,
    hubungan_keluarga,
  } = req.body;

  const sql = `
    INSERT INTO penduduk
    (id_kk, nik, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, pekerjaan, status_perkawinan, hubungan_keluarga)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [id_kk, nik, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, pekerjaan, status_perkawinan, hubungan_keluarga],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Data penduduk berhasil ditambahkan" });
    }
  );
});

// PUT
app.put("/api/penduduk/:id", (req, res) => {
  const { id } = req.params;
  const {
    id_kk,
    nik,
    nama,
    jenis_kelamin,
    tempat_lahir,
    tanggal_lahir,
    agama,
    pekerjaan,
    status_perkawinan,
    hubungan_keluarga,
  } = req.body;

  const sql = `
    UPDATE penduduk SET
    id_kk=?, nik=?, nama=?, jenis_kelamin=?, tempat_lahir=?, tanggal_lahir=?, agama=?, pekerjaan=?, status_perkawinan=?, hubungan_keluarga=?
    WHERE id_penduduk=?
  `;

  db.query(
    sql,
    [id_kk, nik, nama, jenis_kelamin, tempat_lahir, tanggal_lahir, agama, pekerjaan, status_perkawinan, hubungan_keluarga, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Data penduduk berhasil diubah" });
    }
  );
});

// DELETE
app.delete("/api/penduduk/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM penduduk WHERE id_penduduk=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Data penduduk berhasil dihapus" });
  });
});

// Jalankan Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});