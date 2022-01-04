/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require('express');
const { check } = require('express-validator');
var router = express.Router();


var AddressController = require('../controllers/address.controller');

//Create
router.post('/', AddressController.create);

//Read
router.get('/', AddressController.getAddresses);

//GetByOrderId
router.get('/:id', AddressController.findAddress);

//update
router.put('/:id', AddressController.update);

//Delete
router.delete('/:id', AddressController.delete);

module.exports = router;