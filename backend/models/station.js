'use strict'

const mongoose = require('mongoose')

const stationSchema = new mongoose.Schema({
    //Podem marcar els camps únics amb unique:true i  requerits required:true.
    // En el nostre cas posem el nom de l'assignatura com a requerit i unic, i els estudiants no com a unics (Un mateix
    // estudiant pot anar a varies asignatures)
    name: {type: String,unique: true, required: true},
    state: {type: String, enum: ['available', 'NA']},
    description: String,
    bikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bikes',unique: false}]
});

module.exports = mongoose.model('Station',stationSchema);
