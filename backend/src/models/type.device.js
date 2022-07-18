const mongoose = require("mongoose");
const { Schema } = mongoose;

const TypeDeviceSchema = new Schema({
    id: { type: Number, required: true},
    typeDevice: {type: String, required: true}
})

module.exports = mongoose.model('TypeDevice', TypeDeviceSchema);