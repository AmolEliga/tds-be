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
    let task = models.material.build({
      type: req.body.type,
      weight: req.body.weight,
      code: req.body.code
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


exports.getMaterials = async (req, res) => {

  models.material.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log("Error occurred while getMaterials")
    });
};

exports.findMaterial = async (req, res) => {
  const id = req.params.id;
  models.material.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Material with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Material with id=" + id
      });
    });

};


exports.update = (req, res) => {
  const id = req.params.id;
  models.material.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "material updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update material with id=${id}. Maybe material was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating material with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  models.material.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Material was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Material with id=${id}. Maybe Material was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Material with id=" + id
      });
    });
};