/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require('express');
const { check } = require('express-validator');
var router = express.Router();


var WasteOwnerController = require('../controllers/wasteowner.controller');

//Create
router.post('/', WasteOwnerController.create);

//Read
router.get('/', WasteOwnerController.getWasteOwners);

//GetById
router.get('/:id', WasteOwnerController.findWasteOwner);

//update
router.put('/:id', WasteOwnerController.update);

//Delete
router.delete('/:id', WasteOwnerController.delete);

module.exports = router;