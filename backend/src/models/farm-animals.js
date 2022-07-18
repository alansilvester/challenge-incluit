const mongoose = require("mongoose");
const { Schema } = mongoose;

const FarmAnimalsSchema = new Schema({
    id: { type: Number, required: true},
    typeAnimal: {type: String, required: true},
    weight: {type: Number, required: true},
    paddock: {type: String, required: true},
    typeDevice: {type: String, required: true},
    numberDevice: {type: Number, required: true},
})

module.exports = mongoose.model('FarmAnimals', FarmAnimalsSchema);