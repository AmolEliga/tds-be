/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */

const { check, validationResult } = require('express-validator')

var express = require('express')
var bodyParser = require('body-parser')

const models = require("../../models")

exports.create = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let task = models.consignee.build({
      consigneeId: req.body.consigneeId,
      name: req.body.name,
      type: req.body.type,
      addressId: req.body.addressId,
      phone: req.body.phone
    })

    task.save().then(function (newTask) {
      console.log(newTask)
      res.status(200).json(newTask)
    })
  } catch (err) {
    res.status(err.code || 500).send({
      message: err.message || "Error occurred while create ", code: err.code || 500
    });
  }

};


exports.getConsignees = async (req, res) => {
  models.consignee.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log("Error occurred while getConsignees")
    });
};

exports.findConsignee = async (req, res) => {
  const id = req.params.id;
  models.consignee.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find consignee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving consignee with id=" + id
      });
    });

};

exports.update = (req, res) => {
  console.log("req.body")
  console.log(req.body)
  console.log("req.params.id")
  console.log(req.params.id)
  const id = req.params.id;
  models.consignee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "consignee updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update consignee with id=${id}. Maybe consignee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating consignee with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  models.consignee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "consignee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete consignee with id=${id}. Maybe consignee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete consignee with id=" + id
      });
    });
};