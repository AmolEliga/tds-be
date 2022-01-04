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
    let task = models.address.build({
      addressId: req.body.addressId,
      street: req.body.street,
      city: req.body.city,
      postalCode: req.body.postalCode,
      area: req.body.area
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


exports.getAddresses = async (req, res) => {
  models.address.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log("Error occurred while getaddresss")
    });
};

exports.findAddress = async (req, res) => {
  const id = req.params.id;
  models.address.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find address with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving address with id=" + id
      });
    });

};


exports.update = (req, res) => {
  const id = req.params.id;
  models.address.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "address updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update address with id=${id}. Maybe address was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating address with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  models.address.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "address was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete address with id=${id}. Maybe address was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete address with id=" + id
      });
    });
};