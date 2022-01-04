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
    let task = models.document.build({
      createdBy: req.body.createdBy,
      modifiedBy: req.body.modifiedBy,

      state: req.body.state,
      driverId: req.body.driverId,
      materialId: req.body.materialId,
      wasteOwnerId: req.body.wasteOwnerId,
      wasteOwnerType: req.body.wasteOwnerType,
      wasteLocationId: req.body.wasteLocationId,

      consigneeId: req.body.consigneeId,
      consigneeType: req.body.consigneeType,
      consigneeLocationId: req.body.consigneeLocationId,
      pickupLocationId: req.body.pickupLocationId,
      signedBy: req.body.signedBy
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


exports.getDocuments = async (req, res) => {

  models.document.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log("Error occurred while getDocuments")
    });
};

exports.findDocument = async (req, res) => {
  const id = req.params.id;
  let driverId;

  models.document.findByPk(id)
    .then(data => {
      if (data) {
        let documentDetails = {};
        // let driverDtls = {};
        let wasteownerDetails = {};
        let consigneeDetails = {};
        let pickuplocationDetails = {};
        documentDetails.document = data;
        let address;
        let addressId = 1;


        //DRIVERS 

        models.driver.findByPk(data.dataValues.driverId)
          .then(data => {
            if (data) {
              let driverDtls = {};
              driverDtls.driverDetails = data;
              models.address.findByPk(data.dataValues.addressId)
                .then(data => {
                  if (data) {
                    driverDtls.driverAddress = data;
                    documentDetails.driver = driverDtls;
                    //res.send(documentDetails)
                  } else {
                    res.status(404).send({
                      message: `Cannot find address`
                    });
                  }
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).send({
                    message: "Error retrieving address"
                  });
                });

            } else {
              res.status(404).send({
                message: `Cannot find driver with id=${data.dataValues.driverId}.`
              });
            }
          })
          .catch(err => {
            console.log(err)
            res.status(500).send({
              message: "Error retrieving driver with id=" + data.dataValues.driverId
            });
          });

        //materials

        models.material.findByPk(data.dataValues.materialId)
          .then(data => {
            if (data) {
              let materialdetails = {};
              materialdetails.materialDtls = data;
              documentDetails.materialdetails = data;

            } else {
              res.status(404).send({
                message: `Cannot find material with id=${data.dataValues.materialId}.`
              });
            }
          })
          .catch(err => {
            console.log(err)
            res.status(500).send({
              message: "Error retrieving material with id=" + data.dataValues.materialId
            });
          });

        //wasteowner 

        models.wasteowner.findByPk(data.dataValues.wasteOwnerId)
          .then(data => {
            if (data) {
              let wasteOwnerDtls = {};
              wasteOwnerDtls.wasteOwnerDetails = data;
              models.address.findByPk(data.dataValues.addressId)
                .then(data => {
                  if (data) {
                    wasteOwnerDtls.wasteOwnerAddress = data;
                    documentDetails.wasteOwner = wasteOwnerDtls;
                    //res.send(documentDetails)
                  } else {
                    res.status(404).send({
                      message: `Cannot find address`
                    });
                  }
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).send({
                    message: "Error retrieving address"
                  });
                });

            } else {
              res.status(404).send({
                message: `Cannot find wasteOwner with id=${data.dataValues.wasteOwnerId}.`
              });
            }
          })
          .catch(err => {
            console.log(err)
            res.status(500).send({
              message: "Error retrieving wasteOwner with id=" + data.dataValues.wasteOwnerId
            });
          });
        //consignee 

        models.consignee.findByPk(data.dataValues.consigneeId)
          .then(data => {
            if (data) {
              let consigneeDtls = {};
              consigneeDtls.consigneeDetails = data;
              models.address.findByPk(data.dataValues.addressId)
                .then(data => {
                  if (data) {
                    consigneeDtls.consigneeAddress = data;
                    documentDetails.consignee = consigneeDtls;
                    //res.send(documentDetails)
                  } else {
                    res.status(404).send({
                      message: `Cannot find address`
                    });
                  }
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).send({
                    message: "Error retrieving address"
                  });
                });

            } else {
              res.status(404).send({
                message: `Cannot find consignee with id=${data.dataValues.consigneeId}.`
              });
            }
          })
          .catch(err => {
            console.log(err)
            res.status(500).send({
              message: "Error retrieving consignee with id=" + data.dataValues.consigneeId
            });
          });

        //pickuplocation 

        models.pickuplocation.findByPk(data.dataValues.pickupLocationId)
          .then(data => {
            if (data) {
              let pickupLocationDtls = {};
              pickupLocationDtls.pickupLocationDetails = data;
              models.address.findByPk(data.dataValues.addressId)
                .then(data => {
                  if (data) {
                    pickupLocationDtls.pickupLocationAddress = data;
                    documentDetails.pickupLocation = pickupLocationDtls;
                    //res.send(documentDetails)
                  } else {
                    res.status(404).send({
                      message: `Cannot find address`
                    });
                  }
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).send({
                    message: "Error retrieving address"
                  });
                });

            } else {
              res.status(404).send({
                message: `Cannot find pickupLocation with id=${data.dataValues.pickupLocationId}.`
              });
            }
          })
          .catch(err => {
            console.log(err)
            res.status(500).send({
              message: "Error retrieving pickupLocation with id=" + data.dataValues.pickupLocationId
            });
          });


        //pickuplocation 

        models.pickuplocation.findByPk(data.dataValues.pickupLocationId)
          .then(data => {
            if (data) {
              let pickupLocationDtls = {};
              pickupLocationDtls.pickupLocationDetails = data;
              models.address.findByPk(data.dataValues.addressId)
                .then(data => {
                  if (data) {
                    pickupLocationDtls.pickupLocationAddress = data;
                    documentDetails.pickupLocation = pickupLocationDtls;
                    res.send(documentDetails)
                  } else {
                    res.status(404).send({
                      message: `Cannot find address`
                    });
                  }
                })
                .catch(err => {
                  console.log(err)
                  res.status(500).send({
                    message: "Error retrieving address"
                  });
                });

            } else {
              res.status(404).send({
                message: `Cannot find pickupLocation with id=${data.dataValues.pickupLocationId}.`
              });
            }
          })
          .catch(err => {
            console.log(err)
            res.status(500).send({
              message: "Error retrieving pickupLocation with id=" + data.dataValues.pickupLocationId
            });
          });

      } else {
        res.status(404).send({
          message: `Cannot find document with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving document with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  models.document.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "document updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update document with id=${id}. Maybe document was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating document with id=" + id
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;

  models.document.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "document was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete document with id=${id}. Maybe document was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete document with id=" + id
      });
    });
};