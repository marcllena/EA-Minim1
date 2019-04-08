'use strict'

const Station = require('../models/station')
const Bike = require('../models/bike')


function getUnnasignedBikes(req,res) {
    //Funcio per obtindre totes les bicis sense asignar

    console.log("Peticio de obtindre totes les bicis sense asignar")
    Bike.find({assigned: false}).exec(function(err, bikes) {
        if(err) {
            return res.status(500).send({message: `Error al obtindre les bicis: ${err}`})
        }
        if (bikes.length==0){
            return res.status(204).send({message: `No hay ninguna bici sin asignar`})
            }
        else {
            return res.status(200).send(bikes)
        }
    });
}



function assignBikeToStation(req,res){
    //Funció per assignar una bici a una estacio
    let stationId= req.params.stationId
    let bikeId= req.params.bikeId

    //Fem $push per afagir sempre, i $addToSet per afagir només si no hi es
    console.log("Petició d'afagir l'a bici "+bikeId+" a la seguent estacio: "+stationId)

    //Mirem que la bici existeixi
    Bike.findById(bikeId).lean().exec(function(err, bike) {
        if(err){
            return res.status(500).send({message: `Error al obtener la bixi: ${err}`})}
        if (bike.length==0){
            return res.status(400).send({message: `Error al obtener la bici: ${err}. No existe ninguna bici con ese ID`})
        }
        else if (bike.assigned==true){
            return res.status(400).send({message: `Esta bici ya se encuentra asignada a una estacion`})
        }
        else {
            //bike.assigned==true;
            Bike.update({_id: bikeId},{ assigned: true},(err, bike)=>{
                if(err)
                    return res.status(500).send({message: `Error al asignar la bici: ${err}`})
                else if(!bike)
                    return res.status(400).send({message: `Error al asignar la bici: ${err}`})
                else {
                    if (bike.nModified == 1) {
                        //La añadimos a la estacion
                        Station.update({_id: stationId},{$addToSet: { bikes: bikeId}},(err, sta)=>{
                            if(err)
                                return res.status(500).send({message: `Error al asignar la bici: ${err}`})
                            else if(!sta)
                                return res.status(400).send({message: `Error al asignar la bici: ${err}. No existe ninguna estacion con ese ID`})
                            else {
                                if (sta.nModified == 1) {
                                    //Pasem a posar la estació com disponible (al tindre bicis)
                                    Station.update({_id: stationId}, {state: "available"}, (err, stas) => {
                                        if (err)
                                            return res.status(500).send({message: `Error al alterar la estacion: ${err}`})
                                        else if (!stas)
                                            return res.status(400).send({message: `Error al alterar la estacion ${err}`})
                                        else {
                                            res.status(200).send(sta);
                                        }
                                    })
                                }
                                else{
                                    res.status(400).send(sta);
                                }
                            }
                        })
                    }
                    else{
                        res.status(400).send(bike);
                    }
                }
            })
        }
    });

}
function unassignBikeToStation(req,res){
    //Funció per assignar una bici a una estacio
    let stationId= req.params.stationId
    let bikeId= req.params.bikeId

    //Fem $push per afagir sempre, i $addToSet per afagir només si no hi es
    console.log("Petició de treure la bici "+bikeId+" a la seguent estacio: "+stationId)

    //Mirem que la bici existeixi
    Bike.findById(bikeId).lean().exec(function(err, bike) {
        if(err){
            return res.status(500).send({message: `Error al obtener la bixi: ${err}`})}
        if (bike.length==0){
            return res.status(400).send({message: `Error al obtener la bici: ${err}. No existe ninguna bici con ese ID`})
        }
        else if (bike.assigned==false){
            return res.status(400).send({message: `Esta bici ya no se encuentra asignada`})
        }
        else {
            //bike.assigned==true;
            Bike.update({_id: bikeId},{ assigned: false},(err, bike)=>{
                if(err)
                    return res.status(500).send({message: `Error al desasignar la bici: ${err}`})
                else if(!bike)
                    return res.status(400).send({message: `Error al desasignar la bici: ${err}`})
                else {
                    if (bike.nModified == 1) {
                        //La eliminamos a la estacion
                        Station.update({_id: stationId},{$pull: { bikes: bikeId}},(err, sta)=>{
                            if(err)
                                return res.status(500).send({message: `Error al desasignar la bici: ${err}`})
                            else if(!sta)
                                return res.status(400).send({message: `Error al desasignar la bici: ${err}. No existe ninguna estacion con ese ID`})
                            else {
                                //res.status(200).send(sta);
                            //}
                            //Ara hauriem de cambiar el camp a NA de l'estacio
                                if (sta.nModified == 1) {
                                    Station.find({_id: stationId,bikes: {$size: 0}}, (err, estacions) => {
                                        if (err) {
                                            return res.status(500).send({message: `Error al obtener las estaciones: ${err}`})
                                        } else if (estacions.length == 0) {
                                            //Aun tiene bicis
                                            res.status(200).send(sta);
                                        } else {
                                            Station.update({_id: stationId}, {state: "NA"}, (err, stas) => {
                                                if (err)
                                                    return res.status(500).send({message: `Error al alterar la estacion: ${err}`})
                                                else if (!stas)
                                                    return res.status(400).send({message: `Error al alterar la estacion ${err}`})
                                                else {
                                                    res.status(200).send(sta);
                                                }
                                            })
                                        }
                                    })}
                                else
                                    {
                                        res.status(400).send(sta);
                                    }
                                }
                        })
                    }
                    else{
                        res.status(400).send(bike);
                    }
                }
            })
        }
    });

}

module.exports={
    getUnnasignedBikes,
    assignBikeToStation,
    unassignBikeToStation

}
