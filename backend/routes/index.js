'use strict'

/*
Conte totes les rutes, requerin al controlador (subjectCtrl o studentCtrl)
que es on estan implementades
 */
const express = require('express')
const api = express.Router()
const bikeCtrl = require('../controllers/bike')
const stationCtrl = require('../controllers/station')

api.get('/getStations',stationCtrl.getStations),
api.get('/getBikesStation/:stationId',stationCtrl.getBikesFromStation),
api.get('/afagirMostra',stationCtrl.addSampleStation),
api.get('/getUnnasignBikes',bikeCtrl.getUnnasignedBikes),
api.get('/assignBike/:stationId/:bikeId',bikeCtrl.assignBikeToStation),
api.get('/unassignBike/:stationId/:bikeId',bikeCtrl.unassignBikeToStation),


module.exports =  api
