'use strict'

const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
        //Podem marcar els camps únics amb unique:true i  requerits required:true.
        // En el nostre cas posem el nom de l'assignatura com a requerit i unic, i els estudiants no com a unics (Un mateix
        // estudiant pot anar a varies asignatures)
        name: {type: String,unique: true, required: true},
        students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student',unique: false}]
});

module.exports = mongoose.model('Subject',subjectSchema);

/*
Si volguessim guardar directament el Estudiant en comptes del id podriem fer el seguent,
pero comportar que tot es guardi a Subjects:

const StudentSchema = require('./student').schema;

const subjectSchema = new mongoose.Schema({
        //Podem marcar els camps únics amb unique:true. En el nostre cas el nom de l'assignatura
        name: {type: String,unique: true},
        students:[StudentSchema]
});
*/
