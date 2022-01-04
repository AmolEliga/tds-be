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

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    let task = models.pickuplocation.build({
      description: req.body.description,
      addressId: req.body.addressId
    })

    task.save().then(function (newTask) {
      res.status(200).json(newTask)
    })
  } catch (err) {
    res.status(err.code || 500).send({
      message: err.message || "Error occurred while create ", code: err.code || 500
    });
  }

};


exports.getPickupLocations = async (req, res) => {
  models.pickuplocation.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log("Error occurred while getPickupLocations")
    });
};

exports.findPickupLocation = async (req, res) => {
  const id = req.params.id;
  models.pickuplocation.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find pickuplocation with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving pickuplocation with id=" + id
      });
    });

};

exports.update = (req, res) => {
  const id = req.params.id;
  models.pickuplocation.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "pickuplocation updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update pickuplocation with id=${id}. Maybe pickuplocation was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating pickuplocation with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  models.pickuplocation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "pickuplocation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete pickuplocation with id=${id}. Maybe pickuplocation was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete pickuplocation with id=" + id
      });
    });
};