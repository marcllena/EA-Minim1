'use strict'

const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    //Podem marcar els camps únics amb unique:true i  requerits required:true.
    // En el nostre cas posem el nom del estudiant com a requerit i unic,
    name: {type: String,unique: true},
    address: String,
    phones: [{
        name: String,
        address: String
    }]
});

module.exports = mongoose.model('Student',studentSchema);

/*
Si volguessim que un camp només pogues adoptar tres possibles valors, per exemple Strings fariem:
category: {type: String, enum: ['computers', 'phones', 'accessories']},
*/
