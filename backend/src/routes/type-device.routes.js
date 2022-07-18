const express = require("express");
const router = express.Router();

const TypeDevice = require("../models/type.device");

//GET
router.get("/", async (req, res) => {
  const type_device = await TypeDevice.find();
  res.json(type_device);
});

//POST
router.post("/", async (req, res) => {
  const { id, typeDevice } = req.body;
  const type_device = new TypeDevice({
    id,
    typeDevice,
  });
  await type_device.save();
  res.json({ status: "Type Device Saved" });
});

module.exports = router;
