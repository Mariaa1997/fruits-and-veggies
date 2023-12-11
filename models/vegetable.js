const mongoose = require('mongoose');

const VegetableSchema = new mongoose.Schema({
    name: { type: String, required: true},
    color: { type: String, required: true},
    readyToEat: Boolean
});

const Vegetable = mongoose.model('Vegetable', VegetableSchema);

module.exports = Vegetable;