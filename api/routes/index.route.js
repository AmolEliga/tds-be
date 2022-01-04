/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

var express = require("express");
// import transportDocument from '../controllers/transportDocument.controller';
// import authorization from '../middlewares/authorization.middleware';
const router = express.Router();

//import createOrderController from '../controllers/createorderController';

/**
 * @swagger
 * path:
 *  /api/v1/:
 *    get:
 *      summary: Get xx.
 *      description:  xxxx.
 *      tags: [xx]
 *      responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '403':
 *           description: Forbidden
 *         '500':
 *           description: Internal server error
 *      parameters:
 */

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
router.use(bodyParser.json())

router.use("/api/driver",require('./driver.route'));
router.use("/api/documentmaterials", require('./documentmaterials.route'));
router.use("/api/wasteowner", require('./wasteowner.route'));
router.use("/api/consignee", require('./consignee.route'));
router.use("/api/pickuplocation", require('./pickuplocation.route'));
router.use("/api/address", require('./address.route'));
router.use("/api/document", require('./documents.route'));

router.use("/api/material", require('./material.route'));


module.exports = router;
