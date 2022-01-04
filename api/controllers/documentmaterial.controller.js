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
    let task = models.documentmaterial.build({
      documentId: req.body.documentId,
      materialId: req.body.materialId,
      estimatedWeight: req.body.estimatedWeight,
      actualWeight: req.body.actualWeight,
      inspectedBy: req.body.inspectedBy,
      comments: req.body.comments
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


exports.getDocumentmaterials = async (req, res) => {

  models.documentmaterial.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log("Error occurred while getDocumentmaterials")
    });
};

exports.findDocumentmaterial = async (req, res) => {
  const id = req.params.id;
  models.documentmaterial.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Documentmaterial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Documentmaterial with id=" + id
      });
    });

};

exports.update = (req, res) => {
  const id = req.params.id;
  models.documentmaterial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Documentmaterial updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Documentmaterial with id=${id}. Maybe Documentmaterial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Documentmaterial with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  models.documentmaterial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Documentmaterial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Documentmaterial with id=${id}. Maybe Documentmaterial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Documentmaterial with id=" + id
      });
    });
};