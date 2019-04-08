'use strict'

const Student = require('../models/student')
const Subject = require('../models/subject')

function getStudent(req,res){
    //(1)Funcio per obtindre un estudiant donat el seu ID
    let studentId = req.params.studentId

    console.log("Peticio de obtindre informació de un Alumne "+req.params.studentId)

    Student.findById(studentId,(err, al)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener el alumno: ${err}`})
        else if(!al)
            return res.status(400).send({message: `No existe ningun alumno con ese ID `+req.params.subjectId})
        else
            res.status(200).send(al);
    })

}

function addStudent(req,res){
    //Funcio per afagir un estudiant a la base de dades i afagir-lo a una assignatura
    let subjectId = req.params.subjectId
    const StudentNew = new Student({
        name: req.body.name,
        address: req.body.address,
        phones: req.body.phones,
    })

    //Primer guardem al Alumne a la base de dades
    Student.find({name: req.body.name}).lean().exec(function(err, alumno) {
        if(err){
            return res.status(500).send({message: `Error al añadir al alumno: ${err}`})}
        if (!alumno.length){
            StudentNew.save((err) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir el alumno: ${err}. Ya existe un alumno con algun campo único`})
                }
                //Un cop guardat l'afagim a l'assignatura
                Subject.update({_id: subjectId},{$push: { students: StudentNew._id}},(err, subject)=>{
                    if(err)
                        return res.status(500).send({message: `Error al añadir el alumno: ${err}`})
                    else if(!subject)
                        return res.status(400).send({message: `Error al obtener la asignatura: ${err}. No existe ninguna asignatura con ese ID`})
                    else
                        res.status(200).send(subject);
                })
            } )}
        else {
            return res.status(400).send({message: `Error al añadir el alumno: ${req.body.name}. Ya existe un alumno con ese nombre`})
        }
    })
}

function obtainSubjectsOfStudent(req,res){
    //Funció per obtindre les assignatures d'un estudiant donat el seu ID
    let studentId= req.params.studentId

    console.log("Petició de veure les asignatures de l'alumne "+studentId)
    Subject.find({students:studentId}, (err, sub)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener el alumno: ${err}`})
        else if(!sub)
            return res.status(403).send({message: `No existe ningun alumno con ese ID`})
        else if (sub.length==0)
            res.status(201).send(sub);
        else
            res.status(200).send(sub);
    })


}

module.exports={
    getStudent,
    addStudent,
    obtainSubjectsOfStudent

}

/*
Funcions que podem realitzar amb MongoDB:
- Buscar per ID (Student 1)
Student.findById(studentId,(err, al)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener el alumno: ${err}`})
        else if(!al)
            return res.status(400).send({message: `No existe ningun alumno con ese ID `+req.params.subjectId})
        else
            res.status(200).send(al);
    })

Si volem buscar per un altre camp fem:
Student.find({name: req.body.name}).lean().exec(function(err, alumno) {} (Student 2)

Si volem obtindre totes les instancies, pero nomes envia un camp podem fer:
Subject.find({},{name:1},(err, asigs)=>{Subject 1}

- Guardar una instancia a la base de dades (Student 2):
StudentNew.save((err) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir el alumno: ${err}. Ya existe un alumno con algun campo único`})
                }
                    res.status(200).send(subject);
                })
            } )}

- Eliminar una instancia de la base de dades (Subject 7):
Subject.remove({_id: subjectId},(err, sub)=>{
                        if(err)
                            return res.status(500).send({message: `Error al eliminar la asignatura: ${err}`})
                        else if(!sub)
                            return res.status(400).send({message: `Error al eliminar la asignatura: ${subjectId}. No existe ningun asignatura con ese ID`})
                        else {
                            return res.status(204).send({message: `Asignatura eliminada del Sistema`})
                        }
                    })

- Actualitzar un camp (en aquest cas un vector) de una instancia del model:
Fem $push per agafir (Student 2),
Subject.update({_id: subjectId},{$push: { students: StudentNew._id}},(err, subject)=>{
                    if(err)
                        return res.status(500).send({message: `Error al añadir el alumno: ${err}`})
                    else if(!subject)
                        return res.status(400).send({message: `Error al obtener la asignatura: ${err}. No existe ninguna asignatura con ese ID`})
                    else
                        res.status(200).send(subject);
                })
Podriem fer $addToSet per afagir només si no hi es (evitant duplicats)  (Subject 4)
Subject.update({_id: subjectId},{$addToSet: { students: studentId}},(err, stu)=>{}

Per treure un element de un vector fem $pull al que correspongui  (Subject 4)
Subject.update({_id: subjectId},{$pull: { students: studentId}},(err, stu)=>{}

I si el vector fos de objectes (students) fariem:
Subject.update({_id: subjectId},{$push: { students: StudentNew}},(err, stu)=>{

- Un cop declarades, les exportem i les afagim a routes/index.js

- Per obtindre tots els estudiants d'una assignatura en concret podriem utilitzar
$in que busca tots els estudiants amb id el vector 

function getSubjectStudents (req,res){
    console.log('GET /api/subject/students/:subjectId')

    let subjectId = req.params.subjectId

    Subject.findById(subjectId,(err, subject) => {
        if(err)
            return res.status(500).send({message: `Error searching the subject: ${err}`})

        if(!subject)
            return res.status(404).send({message: `Subject does not exist`})

        Student.find({'_id': { $in: subject.students}}, function(err, studentsList){
            res.status(200).send({students: studentsList})
        })
    })
}
*/
