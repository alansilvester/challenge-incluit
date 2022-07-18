const mongoose = require("mongoose");
const { Schema } = mongoose;

const TypeAnimalSchema = new Schema({
    id: { type: Number, required: true},
    typeAnimal: {type: String, required: true}
})

module.exports = mongoose.model('TypeAnimals', TypeAnimalSchema);