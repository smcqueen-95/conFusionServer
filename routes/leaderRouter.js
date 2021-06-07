const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Leaders = require("../models/leaders");
var passport = require("passport");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Leaders.find(req.query)
      .then(
        (leads) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(leads);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Leaders.create(req.body)
      .then(
        (lead) => {
          console.log("Leader Created ", lead);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(lead);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders");
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Leaders.deleteOne({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

leaderRouter
  .route("/:leadId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Leaders.findById(req.params.leadId)
      .then(
        (lead) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(lead);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.dishId);
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leadId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (lead) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(lead);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })

  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leadId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = leaderRouter;
