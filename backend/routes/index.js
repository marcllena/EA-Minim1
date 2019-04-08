'use strict'

/*
Conte totes les rutes, requerin al controlador (subjectCtrl o studentCtrl)
que es on estan implementades
 */
const express = require('express')
const api = express.Router()
const subjectCtrl = require('../controllers/subject')
const studentCtrl = require('../controllers/student')

api.get('/getSubjects',subjectCtrl.getSubjects),
api.get('/getSubject/:subjectId',subjectCtrl.getSubject),
api.get('/addStudentSubject/:subjectId/:studentId',subjectCtrl.addStudentToSubject),
api.get('/removeStudentSubject/:subjectId/:studentId',subjectCtrl.deleteStudentToSubject),
api.post('/addSubject',subjectCtrl.addSubject)
api.get('/afagirMostra',subjectCtrl.addSampleSubject)
api.get('/deleteSubject/:subjectId',subjectCtrl.deleteSubject),
api.post('/addStudent/:subjectId',studentCtrl.addStudent)
api.get('/getStudent/:studentId',studentCtrl.getStudent)
api.get('/obtainSubjectsOfStudent/:studentId',studentCtrl.obtainSubjectsOfStudent),

//Hauriem de utilitzar els put (per actualitzar) i els delete


module.exports =  api
