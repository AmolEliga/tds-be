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
    let task = models.driver.build({
      name: req.body.name,
      type: req.body.type,
      addressId: req.body.addressId,
      phone: req.body.phone
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


exports.getDrivers = async (req, res) => {
  models.driver.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log("Error occurred while getDrivers")
    });
};

exports.findDriver = async (req, res) => {
  const id = req.params.id;
  models.driver.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Driver with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Driver with id=" + id
      });
    });

};


exports.update = (req, res) => {
  const id = req.params.id;
  models.driver.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "driver updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update driver with id=${id}. Maybe driver was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating driver with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  models.driver.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Driver was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Driver with id=${id}. Maybe Driver was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Driver with id=" + id
      });
    });
};