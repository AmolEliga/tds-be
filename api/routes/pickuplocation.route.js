/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require('express');
const { check } = require('express-validator');
var router = express.Router();


var PickuplocationController = require('../controllers/pickuplocation.controller');

//Create
router.post('/', PickuplocationController.create);

//Read
router.get('/', PickuplocationController.getPickupLocations);

//GetById
router.get('/:id', PickuplocationController.findPickupLocation);

//update
router.put('/:id', PickuplocationController.update);

//Delete
router.delete('/:id', PickuplocationController.delete);

module.exports = router;