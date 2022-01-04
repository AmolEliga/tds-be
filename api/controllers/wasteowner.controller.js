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
    let task = models.wasteowner.build({
      wasteOwnerId: req.body.wasteOwnerId,
      name: req.body.name,
      type: req.body.type,
      ID: req.body.ID,
      addressId: req.body.addressId,
      phone: req.body.phone,
      email: req.body.email,

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


exports.getWasteOwners = async (req, res) => {
  models.wasteowner.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log("Error occurred while getWasteOwners")
    });
};

exports.findWasteOwner = async (req, res) => {
  const id = req.params.id;
  models.wasteowner.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find wasteowner with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving wasteowner with id=" + id
      });
    });

};

exports.update = (req, res) => {
  const id = req.params.id;
  models.wasteowner.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "wasteowner updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update wasteowner with id=${id}. Maybe wasteowner was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating wasteowner with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  models.wasteowner.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "wasteowner was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete wasteowner with id=${id}. Maybe wasteowner was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete wasteowner with id=" + id
      });
    });
};