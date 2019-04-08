'use strict'

const Subject = require('../models/subject')
const Student = require('../models/student')

function getSubjects(req,res){
    //Funcio per obtindre el nom de totes les assignature

    console.log("Peticio de obtindre totes les asignatures")
    //Només mostrem la llista de noms de les assignatures
    Subject.find({},{name:1},(err, asigs)=>{
        if(err) {
            return res.status(500).send({message: `Error al obtener las asignaturas: ${err}`})
        }
        else if(!asigs.length) {
            return res.status(400).send({message: `No hay asignaturas`})
        }
        else {
            console.log("Enviando lista de asignaturas"+asigs)
            res.status(200).send(asigs);
        }
    })

}

function getSubject(req,res){
    //Funcio per obtindre una asignatura en base al seu ID
    let subjectId = req.params.subjectId

    console.log("Peticio de obtindre una asignatura")
    //Al demanar només una asignatura enviem tota la llista de IDs dels alumnes
    Subject.findById(subjectId, (err, asig)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener la asignaturas: ${err}`})
        else if(!asig)
            return res.status(400).send({message: `No existe ninguna asignatura con ese ID `+req.params.subjectId})
        else
            res.status(200).send(asig);
    })

}

function addSubject(req,res){
    //Funció per afagir una assignatura sense alumnes
    const subjectNew = new Subject({
        name: req.body.name,
    })

    console.log("Petició d'afagir la seguent asignatura:"+subjectNew)
    Subject.find({name: req.body.name}).lean().exec(function(err, subj) {
        if(err){
            return res.status(500).send({message: `Error al añadir la asignatura: ${err}`})}
        if (!subj.length){
            subjectNew.save((err) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir la asignatura: ${err}. Ya existe una asignatura con algun campo único`})
                }
                res.status(200).send(subjectNew)
            } )     }
        else {
            return res.status(400).send({message: `Error al añadir la asignatura: ${req.body.name}. Ya existe una asignatura con el mismo nombre`})
        }
    })

}


function addStudentToSubject(req,res){
    //Funció per afagir un alumne a una asignatura donat els dos IDs
    let subjectId= req.params.subjectId
    let studentId= req.params.studentId

    //Fem $push per afagir sempre, i $addToSet per afagir només si no hi es
    console.log("Petició d'afagir l'alumne "+studentId+" a la seguent asignatura: "+subjectId)

            Student.findById(studentId).lean().exec(function(err, subj) {
                if(err){
                    return res.status(500).send({message: `Error al obtener el alumno: ${err}`})}
                if (subj.length==0){
                    return res.status(400).send({message: `Error al obtener el alumno: ${err}. No existe ningun alumno con ese ID`})
                }
                else {
                    Subject.update({_id: subjectId},{$addToSet: { students: studentId}},(err, stu)=>{
                        if(err)
                            return res.status(500).send({message: `Error al añadir el alumno: ${err}`})
                        else if(!stu)
                            return res.status(400).send({message: `Error al obtener la asignatura: ${subjectId}. No existe ninguna asignatura con ese ID`})
                        else {
                            if (stu.nModified == 1) {
                                res.status(200).send(stu);
                            }
                            else{
                                res.status(400).send(stu);
                            }
                        }
                    })
                }
            });

}

function addSampleSubject(req,res){
    //Funcio per afagir un alumne i una assignatura de mostra
    console.log("Petició d'afagir asignatura mostra")
    let studentNew= new Student ({name: "Marc",address:"Rue del Percebe",
        phones:[{name: "Casa", address: "838020"},{name: "Mobil", address: "323020"}]})

    Student.find({name: studentNew.name}).exec(function(err, student) {
        if(err) {
            return res.status(500).send({message: `Error al añadir el alumno: ${err}`})
        }
        if (student.length==0){
            studentNew.save((err,studentSaved) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir el alumno: ${err}. Ya existe un alumno con ese nombre`})
                }
                var subjectNew = new Subject({name: "IOT", students: studentSaved._id});

                Subject.find(subjectNew).lean().exec(function (err, subj) {
                    if (err) {
                        return res.status(500).send({message: `Error al añadir la asignatura: ${err}.`})
                    }
                    if (!subj.length) {
                        subjectNew.save((err) => {
                            if (err) {
                                return res.status(400).send({message: `Error al añadir la asignatura: ${err}. Ya existe una asignatura con algun campo único`})
                            }
                            return res.status(200).send({message: subjectNew})
                        })
                    } else {
                        return res.status(400).send({message: `Error al añadir la asignatura: ${subjectNew.name}. Ya existe una asignatura con ese nombre`})
                    }
                })
            } ) }
        else {
            return res.status(400).send({message: `Error al añadir el alumno: ${studentNew.name}`})
        }
    });

}

function deleteStudentToSubject(req,res){
    //Funció per afagir un alumne a una asignatura donat els dos IDs
    let subjectId= req.params.subjectId
    let studentId= req.params.studentId

    //Fem $pull per treure l'estudiant
    console.log("Petició de treure l'alumne "+studentId+" a la seguent asignatura: "+subjectId)

    //Mirem si l'estudiant existeix
    Student.findById(studentId).lean().exec(function(err, subj) {
        if(err){
            return res.status(500).send({message: `Error al obtener el alumno: ${err}`})}
        if (subj.length==0){
            return res.status(400).send({message: `Error al obtener el alumno: ${err}. No existe ningun alumno con ese ID`})
        }
        else {
            //Si existeix, treguem el ID del vector students de l'assignatura
            Subject.update({_id: subjectId},{$pull: { students: studentId}},(err, stu)=>{
                if(err)
                    return res.status(500).send({message: `Error al eliminar el alumno: ${err}`})
                else if(!stu)
                    return res.status(400).send({message: `Error al obtener la asignatura: ${subjectId}. No existe ninguna asignatura con ese ID`})
                else {
                    if (stu.nModified == 1) {
                        //Mirem si esta en alguna asignatura más
                        Subject.find({students:studentId}, (err, sub)=>{
                            if(err)
                                return res.status(500).send({message: `Error al obtener el alumno: ${err}`})
                            else if(!sub)
                                return res.status(400).send({message: `No existe ningun alumno con ese ID`})
                            else if (sub.length==0)
                            {
                                //Si l'estudiant no pertany a cap més assignatura l'eliminem per complet
                                Student.remove({_id: studentId},(err, stu)=>{
                                    if(err)
                                        return res.status(500).send({message: `Error al eliminar el alumno: ${err}`})
                                    else if(!stu)
                                        return res.status(400).send({message: `Error al eliminar el alumno: ${studentId}. No existe ningun alumno con ese ID`})
                                    else {
                                        return res.status(204).send({message: `Alumno eliminado del Sistema`})
                                    }
                                    }
                                )
                            }
                            else
                                return res.status(200).send({message: `Alumno eliminado de la Asignatura`}); //El alumne pertany a altres asignatures
                        })
                    }
                    else{
                        //El alumno ya no esta en la asignatura
                        res.status(400).send({message: "El alumno no esta en la asignatura"})
                    }
                }
            })
        }
    });

}

function deleteSubject(req,res){
    //Funció per eliminar una assignatura sense estudiants
    let subjectId= req.params.subjectId

    console.log("Petició d'eliminar la seguent asignatura:"+subjectId)
    Subject.find({_id:subjectId}).lean().exec(function(err, subj) {
        if(err){
            return res.status(500).send({message: `Error al buscar la asignatura: ${err}`})}
        if(subj!=null){
            if (subj[0].students.length==0) {
                //Si no cap estudiants, la eliminem
                Subject.remove({_id: subjectId},(err, sub)=>{
                        if(err)
                            return res.status(500).send({message: `Error al eliminar la asignatura: ${err}`})
                        else if(!sub)
                            return res.status(400).send({message: `Error al eliminar la asignatura: ${subjectId}. No existe ningun asignatura con ese ID`})
                        else {
                            return res.status(204).send({message: `Asignatura eliminada del Sistema`})
                        }
                    }
                )
            }
            else{
                return res.status(200).send(subj)
            }
        }
        else {
            return res.status(400).send({message: `Error al eliminar la asignatura: ${subjectId}. No existe ninguna asignatura con ese ID`})
        }
    })

}



module.exports={
    getSubjects,
    getSubject,
    addSubject,
    addSampleSubject,
    addStudentToSubject,
    deleteStudentToSubject,
    deleteSubject
}
