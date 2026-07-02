import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5001/api";

function App() {
  const [dataKK, setDataKK] = useState([]);
  const [dataPenduduk, setDataPenduduk] = useState([]);
  const [editIdKK, setEditIdKK] = useState(null);
  const [editIdPenduduk, setEditIdPenduduk] = useState(null);

  const kosongKK = {
    no_kk: "",
    kepala_keluarga: "",
    alamat: "",
    rt: "",
    rw: "",
    desa: "Tamansari",
    kecamatan: "Pangkalan",
    kabupaten: "Karawang",
  };

  const kosongPenduduk = {
    id_kk: "",
    nik: "",
    nama: "",
    jenis_kelamin: "Laki-laki",
    tempat_lahir: "",
    tanggal_lahir: "",
    agama: "",
    pekerjaan: "",
    status_perkawinan: "",
    hubungan_keluarga: "",
  };

  const [formKK, setFormKK] = useState(kosongKK);
  const [formPenduduk, setFormPenduduk] = useState(kosongPenduduk);

  const getData = async () => {
    const kk = await axios.get(`${API}/kartu-keluarga`);
    const penduduk = await axios.get(`${API}/penduduk`);
    setDataKK(kk.data);
    setDataPenduduk(penduduk.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleKK = (e) => {
    setFormKK({ ...formKK, [e.target.name]: e.target.value });
  };

  const handlePenduduk = (e) => {
    setFormPenduduk({ ...formPenduduk, [e.target.name]: e.target.value });
  };

  const simpanKK = async (e) => {
    e.preventDefault();

    if (editIdKK) {
      await axios.put(`${API}/kartu-keluarga/${editIdKK}`, formKK);
      alert("Data KK berhasil diubah");
      setEditIdKK(null);
    } else {
      await axios.post(`${API}/kartu-keluarga`, formKK);
      alert("Data KK berhasil ditambahkan");
    }

    setFormKK(kosongKK);
    getData();
  };

  const editKK = (item) => {
    setEditIdKK(item.id_kk);
    setFormKK({
      no_kk: item.no_kk,
      kepala_keluarga: item.kepala_keluarga,
      alamat: item.alamat,
      rt: item.rt,
      rw: item.rw,
      desa: item.desa,
      kecamatan: item.kecamatan,
      kabupaten: item.kabupaten,
    });
  };

  const hapusKK = async (id) => {
    if (confirm("Yakin hapus data KK?")) {
      await axios.delete(`${API}/kartu-keluarga/${id}`);
      getData();
    }
  };

  const simpanPenduduk = async (e) => {
    e.preventDefault();

    if (editIdPenduduk) {
      await axios.put(`${API}/penduduk/${editIdPenduduk}`, formPenduduk);
      alert("Data penduduk berhasil diubah");
      setEditIdPenduduk(null);
    } else {
      await axios.post(`${API}/penduduk`, formPenduduk);
      alert("Data penduduk berhasil ditambahkan");
    }

    setFormPenduduk(kosongPenduduk);
    getData();
  };

  const editPenduduk = (item) => {
    setEditIdPenduduk(item.id_penduduk);
    setFormPenduduk({
      id_kk: item.id_kk,
      nik: item.nik,
      nama: item.nama,
      jenis_kelamin: item.jenis_kelamin,
      tempat_lahir: item.tempat_lahir || "",
      tanggal_lahir: item.tanggal_lahir ? item.tanggal_lahir.substring(0, 10) : "",
      agama: item.agama || "",
      pekerjaan: item.pekerjaan || "",
      status_perkawinan: item.status_perkawinan || "",
      hubungan_keluarga: item.hubungan_keluarga || "",
    });
  };

  const hapusPenduduk = async (id) => {
    if (confirm("Yakin hapus data penduduk?")) {
      await axios.delete(`${API}/penduduk/${id}`);
      getData();
    }
  };

  return (
    <div className="container">
      <h1>Sistem Informasi Data Kependudukan</h1>
      <p>Aplikasi pengelolaan data kartu keluarga dan penduduk desa</p>

      <div className="card">
        <h2>{editIdKK ? "Edit Data Kartu Keluarga" : "Tambah Data Kartu Keluarga"}</h2>
        <form onSubmit={simpanKK}>
          <input name="no_kk" placeholder="Nomor KK" value={formKK.no_kk} onChange={handleKK} required />
          <input name="kepala_keluarga" placeholder="Kepala Keluarga" value={formKK.kepala_keluarga} onChange={handleKK} required />
          <textarea name="alamat" placeholder="Alamat" value={formKK.alamat} onChange={handleKK} required />
          <input name="rt" placeholder="RT" value={formKK.rt} onChange={handleKK} />
          <input name="rw" placeholder="RW" value={formKK.rw} onChange={handleKK} />
          <input name="desa" placeholder="Desa" value={formKK.desa} onChange={handleKK} />
          <input name="kecamatan" placeholder="Kecamatan" value={formKK.kecamatan} onChange={handleKK} />
          <input name="kabupaten" placeholder="Kabupaten" value={formKK.kabupaten} onChange={handleKK} />
          <button type="submit">{editIdKK ? "Update KK" : "Simpan KK"}</button>
        </form>
      </div>

      <div className="card">
        <h2>Data Kartu Keluarga</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>No KK</th>
              <th>Kepala Keluarga</th>
              <th>Alamat</th>
              <th>RT/RW</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataKK.map((item, index) => (
              <tr key={item.id_kk}>
                <td>{index + 1}</td>
                <td>{item.no_kk}</td>
                <td>{item.kepala_keluarga}</td>
                <td>{item.alamat}</td>
                <td>{item.rt}/{item.rw}</td>
                <td>
                  <button className="edit" onClick={() => editKK(item)}>Edit</button>
                  <button className="hapus" onClick={() => hapusKK(item.id_kk)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>{editIdPenduduk ? "Edit Data Penduduk" : "Tambah Data Penduduk"}</h2>
        <form onSubmit={simpanPenduduk}>
          <select name="id_kk" value={formPenduduk.id_kk} onChange={handlePenduduk} required>
            <option value="">Pilih Kartu Keluarga</option>
            {dataKK.map((kk) => (
              <option key={kk.id_kk} value={kk.id_kk}>
                {kk.no_kk} - {kk.kepala_keluarga}
              </option>
            ))}
          </select>

          <input name="nik" placeholder="NIK" value={formPenduduk.nik} onChange={handlePenduduk} required />
          <input name="nama" placeholder="Nama Penduduk" value={formPenduduk.nama} onChange={handlePenduduk} required />

          <select name="jenis_kelamin" value={formPenduduk.jenis_kelamin} onChange={handlePenduduk}>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>

          <input name="tempat_lahir" placeholder="Tempat Lahir" value={formPenduduk.tempat_lahir} onChange={handlePenduduk} />
          <input type="date" name="tanggal_lahir" value={formPenduduk.tanggal_lahir} onChange={handlePenduduk} />
          <input name="agama" placeholder="Agama" value={formPenduduk.agama} onChange={handlePenduduk} />
          <input name="pekerjaan" placeholder="Pekerjaan" value={formPenduduk.pekerjaan} onChange={handlePenduduk} />
          <input name="status_perkawinan" placeholder="Status Perkawinan" value={formPenduduk.status_perkawinan} onChange={handlePenduduk} />
          <input name="hubungan_keluarga" placeholder="Hubungan Keluarga" value={formPenduduk.hubungan_keluarga} onChange={handlePenduduk} />

          <button type="submit">{editIdPenduduk ? "Update Penduduk" : "Simpan Penduduk"}</button>
        </form>
      </div>

      <div className="card">
        <h2>Data Penduduk</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>No KK</th>
              <th>NIK</th>
              <th>Nama</th>
              <th>Jenis Kelamin</th>
              <th>Pekerjaan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataPenduduk.map((item, index) => (
              <tr key={item.id_penduduk}>
                <td>{index + 1}</td>
                <td>{item.no_kk}</td>
                <td>{item.nik}</td>
                <td>{item.nama}</td>
                <td>{item.jenis_kelamin}</td>
                <td>{item.pekerjaan}</td>
                <td>
                  <button className="edit" onClick={() => editPenduduk(item)}>Edit</button>
                  <button className="hapus" onClick={() => hapusPenduduk(item.id_penduduk)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;