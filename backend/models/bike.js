'use strict'

const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
    //Podem marcar els camps únics amb unique:true i  requerits required:true.
    // En el nostre cas posem el nom del estudiant com a requerit i unic,
    name: {type: String,unique: true},
    kms: Number,
    description: String,
    assigned: Boolean,
});

module.exports = mongoose.model('Bike',bikeSchema);
