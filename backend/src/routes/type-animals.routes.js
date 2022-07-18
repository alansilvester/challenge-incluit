const express = require("express");
const router = express.Router();

const TypeAnimals = require("../models/type-animal");

//GET
router.get("/", async (req, res) => {
  const type_animals = await TypeAnimals.find();
  res.json(type_animals);
});

//POST
router.post("/", async (req, res) => {
  const { id, typeAnimal } = req.body;
  const type_animals = new TypeAnimals({
    id,
    typeAnimal,
  });
  await type_animals.save();
  res.json({ status: "Type Animal Saved" });
});

module.exports = router;
