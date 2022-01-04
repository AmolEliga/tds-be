/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require('express');
const { check } = require('express-validator');
var router = express.Router();


var DocumentController = require('../controllers/documents.controller');

//Create
router.post('/', DocumentController.create);

//Read
router.get('/', DocumentController.getDocuments);

//GetById
router.get('/:id', DocumentController.findDocument);

//update
router.put('/:id', DocumentController.update);

//Delete
router.delete('/:id', DocumentController.delete);

module.exports = router;