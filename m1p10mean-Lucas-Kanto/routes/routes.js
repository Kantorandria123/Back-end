var express = require('express');

const router = express.Router();

var clientController = require('../src/client/ClientControlleur');
var serviceControlleur = require('../src/service/ServiceControlleur');
var employeControlleur = require('../src/employe/EmployeControlleur');
var rendezvousControlleur = require('../src/rendezvous/RendezvousControlleur');

/*client*/ 
router.route('/client/login').post(clientController.loginUserControllerFn);
router.route('/client/create').post(clientController.createClientControllerFn);
router.route('/client/getbytoken').post(clientController.getClientByTokenControlleur);

/*service*/ 
router.route('/service/lesservices').get(serviceControlleur.getListServiceControlleur);

/*employe*/ 
router.route('/employe/lesEmployes').get(employeControlleur.getlisteEmployeControlleur);

/*rendezvous*/ 
router.route('/rendezvous/creer').post(rendezvousControlleur.creerRendevousControlleur);

module.exports = router;