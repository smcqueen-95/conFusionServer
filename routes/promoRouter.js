const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route("/").all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
});
promoRouter.get("/", (req, res, next) => {
  res.end("Will send all the promotions to you!");
});

promoRouter.post("/", (req, res, next) => {
  res.end(
    "Will add the promotion: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});
promoRouter.put("/", (req, res, next) => {
  res.statusCode = 403;
  res.end("PUT operation not supported on /promos");
});
promoRouter.delete("/", (req, res, next) => {
  res.end("Deleting all promotions");
});

promoRouter.get("/:promoId", (req, res, next) => {
  res.end(
    "Will send details of the promotion: " + req.params.promoId + " to you!"
  );
});

promoRouter.post("/:promoId", (req, res, next) => {
  res.statusCode = 403;
  res.end("POST operation not supported on /promos/" + req.params.promoId);
});
promoRouter.put("/:promoId", (req, res, next) => {
  res.write("Updating the promotion: " + req.params.promoId + "\n");
  res.end(
    "Will update the promotion: " +
      req.body.name +
      " with details: " +
      req.body.description
  );
});
promoRouter.delete("/:promoId", (req, res, next) => {
  res.end("Deleting promotion: " + req.params.promoId);
});

module.exports = promoRouter;
