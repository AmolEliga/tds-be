/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require('express');
const { check } = require('express-validator');
var router = express.Router();


var ConsigneeController = require('../controllers/consignee.controller');

//Create
router.post('/', ConsigneeController.create);

//Read
router.get('/', ConsigneeController.getConsignees);

//GetById
router.get('/:id', ConsigneeController.findConsignee);

//update
router.put('/:id', ConsigneeController.update);

//Delete
router.delete('/:id', ConsigneeController.delete);

module.exports = router;