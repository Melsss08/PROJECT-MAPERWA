const express = require("express");
const KelolaBeranda = require("../models/kelolaBeranda");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { judul, visi, misi } = req.body;
    const data = await KelolaBeranda.create({ judul, visi, misi });
    res.status(201).json({ message: "Berhasil disimpan", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal menyimpan data" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await KelolaBeranda.findOne({ order: [['createdAt', 'DESC']] });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data" });
  }
});

module.exports = router;
