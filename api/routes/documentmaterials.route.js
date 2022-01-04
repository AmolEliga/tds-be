/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require('express');
const { check } = require('express-validator');
var router = express.Router();


var DocumentmaterialController = require('../controllers/documentmaterial.controller');

//Create
router.post('/', DocumentmaterialController.create);

//Read
router.get('/', DocumentmaterialController.getDocumentmaterials);

//GetById
router.get('/:id', DocumentmaterialController.findDocumentmaterial);

//update
router.put('/:id', DocumentmaterialController.update);

//Delete
router.delete('/:id', DocumentmaterialController.delete);

module.exports = router;