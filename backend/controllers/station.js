'use strict'

const Station = require('../models/station')
const Bike = require('../models/bike')

function getStations(req,res){
    //Funcio per obtindre totes les estacions

    console.log("Peticio de obtindre totes les estacions")
    Station.find({},(err, estacions)=>{
        if(err) {
            return res.status(500).send({message: `Error al obtener las estaciones: ${err}`})
        }
        else if(!estacions.length) {
            return res.status(400).send({message: `No hay estaciones`})
        }
        else {
            console.log("Enviando lista de estaciones"+estacions)
            res.status(200).send(estacions);
        }
    })

}

function getBikesFromStation(req,res){
    //Funcio per obtindre totes les estacions

    let stationId = req.params.stationId

    Station.findById(stationId,(err, station) => {
        if(err)
            return res.status(500).send({message: `Error al obtener la estacion: ${err}`})

        if(!station)
            return res.status(400).send({message: `La estacion no existe`})

        Bike.find({'_id': { $in: station.bikes}}, function(err, bikesList){
            if(bikesList.length==0)
            {
                return res.status(204).send({message: `La estacion no tiene bicis`})
            }
            else
            return res.status(200).send({bikes: bikesList})
        })
    })

}

function addSampleStation(req,res){
    console.log("Petició d'afagir estacio mostra")

    let bikeNew= new Bike ({name: "B1",kms:250,description: "Value",assigned:true})

    Bike.find({name: bikeNew.name}).exec(function(err, bike) {
        if(err) {
            return res.status(500).send({message: `Error al añadir bici: ${err}`})
        }
        if (bike.length==0){
            bikeNew.save((err,bikeSaved) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir la bici: ${err}. Ya existe una bici con ese nombre`})
                }

                var stationNew = new Station({name: "Plaça Catalunya",state:"available",description: "Value", bikes: bikeSaved._id});

                Station.find(stationNew).lean().exec(function (err, station) {
                    if (err) {
                        return res.status(500).send({message: `Error al añadir la estacion: ${err}.`})
                    }
                    if (!station.length) {
                        stationNew.save((err) => {
                            if (err) {
                                return res.status(400).send({message: `Error al añadir la estacion: ${err}. Ya existe una estacion con algun campo único`})
                            }
                            return res.status(200).send({message: stationNew})
                        })
                    } else {
                        return res.status(400).send({message: `Error al añadir la estacion: ${stationNew.name}. Ya existe una estacion con ese nombre`})
                    }
                })
            } ) }
        else {
            return res.status(400).send({message: `Error al añadir la bici: ${bikeNew.name}. Ya existe una bici con ese nombre`})
        }
    });

}

function addSampleStation2(req,res){
    console.log("Petició d'afagir estacio mostra2")

    let bikeNew= new Bike ({name: "B2",kms:100,description: "Value",assigned:true})

    Bike.find({name: bikeNew.name}).exec(function(err, bike) {
        if(err) {
            return res.status(500).send({message: `Error al añadir bici: ${err}`})
        }
        if (bike.length==0){
            bikeNew.save((err,bikeSaved) => {
                if(err) {
                    return res.status(400).send({message: `Error al añadir la bici: ${err}. Ya existe una bici con ese nombre`})
                }

                var stationNew = new Station({name: "Les Corts",state:"available",description: "Value", bikes: bikeSaved._id});

                Station.find(stationNew).lean().exec(function (err, station) {
                    if (err) {
                        return res.status(500).send({message: `Error al añadir la estacion: ${err}.`})
                    }
                    if (!station.length) {
                        stationNew.save((err) => {
                            if (err) {
                                return res.status(400).send({message: `Error al añadir la estacion: ${err}. Ya existe una estacion con algun campo único`})
                            }
                            return res.status(200).send({message: stationNew})
                        })
                    } else {
                        return res.status(400).send({message: `Error al añadir la estacion: ${stationNew.name}. Ya existe una estacion con ese nombre`})
                    }
                })
            } ) }
        else {
            return res.status(400).send({message: `Error al añadir la bici: ${bikeNew.name}. Ya existe una bici con ese nombre`})
        }
    });

}

module.exports={
    getStations,
    getBikesFromStation,
    addSampleStation,
    addSampleStation2,
}
