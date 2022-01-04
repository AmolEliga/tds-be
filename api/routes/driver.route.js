/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require('express');
const { check } = require('express-validator');
var router = express.Router();


var DriverController = require('../controllers/driver.controller');

//Create
router.post('/', DriverController.create);

//Read
router.get('/', DriverController.getDrivers);

//GetById
router.get('/:id', DriverController.findDriver);

//update
router.put('/:id', DriverController.update);

//Delete
router.delete('/:id', DriverController.delete);

module.exports = router;