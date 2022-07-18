const express = require("express");
const router = express.Router();

const Animals = require("../models/farm-animals");

//GET
router.get("/", async (req, res) => {
  const animals = await Animals.find();
  res.json(animals);
});

//GEY BY ID
router.get("/:id", async (req, res) => {
  const animal = await Animals.findById(req.params.id);
  res.json(animal);
});

//POST
router.post("/", async (req, res) => {
  const { id, typeAnimal, weight, paddock, typeDevice, numberDevice } =
    req.body;
  const animal = new Animals({
    id,
    typeAnimal,
    weight,
    paddock,
    typeDevice,
    numberDevice,
  });
  await animal.save();
  res.json({ status: "Animal Saved" });
});

//PUT
router.put("/:id", async (req, res) => {
  const { id, typeAnimal, weight, paddock, typeDevice, numberDevice } =
    req.body;
  const animal = {
    id,
    typeAnimal,
    weight,
    paddock,
    typeDevice,
    numberDevice,
  };
  await Animals.findByIdAndUpdate(req.params.id, animal);
  console.log(req.params.id);
  res.json({ status: "Animal Update" });
});

//DELETE
router.delete("/:id", async (req, res) => {
  await Animals.findByIdAndRemove(req.params.id);
  res.json({ status: "Animal Delete" });
});

module.exports = router;
