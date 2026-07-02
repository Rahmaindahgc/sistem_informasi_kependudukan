const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM kartu_keluarga", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    res.json(result);
  });
});

module.exports = router;