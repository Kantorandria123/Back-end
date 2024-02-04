var express = require('express');

const router = express.Router();

var clientController = require('../src/client/ClientControlleur');
var serviceControlleur = require('../src/service/ServiceControlleur');
var employeControlleur = require('../src/employe/EmployeControlleur');

router.route('/client/login').post(clientController.loginUserControllerFn);
router.route('/client/create').post(clientController.createClientControllerFn);
router.route('/client/getbytoken').post(clientController.getClientByTokenControlleur);

router.route('/service/lesservices').get(serviceControlleur.getListServiceControlleur);

router.route('/employe/lesEmployes').get(employeControlleur.getlisteEmployeControlleur);
module.exports = router;