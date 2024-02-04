var express = require('express');

const router = express.Router();

var clientController = require('../src/client/ClientControlleur');


router.route('/client/login').post(clientController.loginUserControllerFn);
router.route('/client/create').post(clientController.createClientControllerFn);
router.route('/client/getbytoken').post(clientController.getClientByTokenControlleur);
module.exports = router;