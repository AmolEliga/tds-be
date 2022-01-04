/*
 *
 * Copyright (c) Tamtron Oy. All rights reserved.
 *
 */
// const CircularJSON = require('circular-json');

// const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'postgres',
//     host: 'postgres.c0az6wpsp8da.us-east-2.rds.amazonaws.com',
//     database: 'postgres',
//     password: 'rootroot',
//     port: 5438,
// })

// pool.connect();

//////////////// ************* ARCHIVE CODE FORMAT*************************/////////////////



//////////////// ************* ARCHIVE CODE FORMAT*************************/////////////////

const { check, validationResult } = require('express-validator')

var express = require('express')
var bodyParser = require('body-parser')

// const db = require("../models1");
// const Material = db.material;
// const Op = db.Sequelize.Op;

const models = require("../../models")

models.User.findAll().then(function (item) {

})



//   models.User.findAll()
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//       console.log("erro")
//     });

//   let task = models.User.build({
//     id: 2,
//     name: 'amol',
//     email: 't',
//     bio: 't',
//     createdAt: '2011-01-01T00:00:00.000Z',
//     updatedAt: '2011-01-01T00:00:00.000Z'
//   })

//   task.save().then(function(newTask){
//       console.log(newTask)
//   })


exports.create = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const orderid = parseInt(req.body.orderId);
    console.log("-----------req.body");
    console.log(req.body)

    pool.params(`SELECT * FROM order_document WHERE orderid = $1`, [orderid], (error, results) => {

        try {
            console.log("results.rows.length")
            console.log(results)
            if (results.rows.length === 0) {
                let materialsarr = new Array();
                if (!Array.isArray(req.body.materials)) {
                    if (req.body.materials)
                        materialsarr.push(req.body.materials);
                } else {
                    if (req.body.materials)
                        materialsarr = req.body.materials;
                }

                const orderid = req.body.orderId;
                const customer = req.body.customer;
                const pickup = req.body.pickup;
                const destination = req.body.destination;
                const signature = req.body.signature;
                const createdAt = req.body.createdAt;
                const documentname = req.body.documentName;
                const status = req.body.status;
                const vehicleid = req.body.vehicleId;
                const type = req.body.type;
                const weight = req.body.weight;

                pool.params('INSERT INTO order_document (orderid,customer,pickup,destination,signature,createdAt,documentname,status,vehicleid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [orderid, customer, pickup, destination, signature, createdAt, documentname, status, vehicleid], (error, results) => {
                    if (error) {
                        console.log("error")
                        throw error
                    }
                })

                for (let mtrl of materialsarr) {


                    pool.params('INSERT INTO material (orderid,type,weight) VALUES ($1, $2, $3)', [orderid, mtrl.type, mtrl.weight], (error, results) => {
                        if (error) {
                            console.log("error")
                            throw error
                        }

                    })
                }
                res.status(201).send("success created")
            }
            else {
                res.status(404).send({ message: "orderid already exits ", code: 500 });
            }
        } catch (err) {
            res.status(err.code || 500).send({
                message: err.message || "Error occurred while creating the document", code: err.code || 500
            });
        }
    })

};


exports.getDocumentReports = async (req, res) => {



    try {


        // const title = req.params.title;
        // var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

        // Material.findAll({ where: null })
        //   .then(data => {
        //     console.log(data)
        //     console.log(data)
        //     res.send(data);
        //   })
        //   .catch(err => {
        //     res.status(500).send({
        //       message:
        //         err.message || "Some error occurred while retrieving tutorials."
        //     });
        //   });



        // pool.params(`select * from order_document`, (err, results) => {
        //     if (!err) {
        //         let result = CircularJSON.stringify(results.rows);
        //         console.log(result)
        //     } else {
        //         console.log(err)
        //     }

        //     res.status(200).json(results.rows)
        // })

    } catch (err) {
        res.status(err.code || 500).send({
            message: err.message || "Error occurred while getDocumentReports ", code: err.code || 500
        });
    }

};

exports.findDocumentReport = async (request, response) => {
    try {
        const errors = validationResult(request);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const orderid = parseInt(request.params.id);
        pool.params(`SELECT * FROM order_document WHERE orderid = $1`, [orderid], (error, results) => {
            if (!error) {

            } else {
                console.log(error)
            }
            console.log(results)
            response.status(200).json(results.rows)
        })
    } catch (err) {
        res.status(err.code || 500).send({
            message: err.message || "Error occurred while findDocumentReport ", code: err.code || 500
        });
    }

};

exports.update = async (request, response) => {

    try {

        const errors = validationResult(request);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const orderid = parseInt(request.params.id);
        pool.params(`SELECT * FROM order_document WHERE orderid = $1`, [orderid], (error, results) => {

            if (!error) {

            } else {
                console.log(error)
            }
            response.status(200).json(results)
        })
    } catch (err) {
        res.status(err.code || 500).send({
            message: err.message || "Error occurred while updating document ", code: err.code || 500
        });
    }

};

exports.delete = async (request, response) => {
    try {
        const errors = validationResult(request);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const orderid = parseInt(request.params.id);
        pool.params(`DELETE  FROM order_document WHERE orderid = $1`, [orderid], (error, results) => {
            if (!error) {

            } else {
                console.log(error)
            }
            response.status(200).json("delete success")
        })
    } catch (err) {
        res.status(err.code || 500).send({
            message: err.message || "Error occurred while deleting document ", code: err.code || 500
        });
    }
};