/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require('express');
const { check } = require('express-validator');
var router = express.Router();


var MaterialController = require('../controllers/material.controller');

//Create
router.post('/', MaterialController.create);

//Read
router.get('/', MaterialController.getMaterials);

//GetById
router.get('/:id', MaterialController.findMaterial);

//update
router.put('/:id', MaterialController.update);

//Delete
router.delete('/:id', MaterialController.delete);

module.exports = router;