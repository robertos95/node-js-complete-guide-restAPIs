const express = require("express");
const router = express.Router();
const { Rental } = require("../models/rental");

router.post("/", async (req, res) => {
  if (!req.body.customerId)
    return res.status(400).send("customerId not provided");
  if (!req.body.movieId) return res.status(400).send("movieId not provided");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental)
    return res
      .status(404)
      .send("Rental not found.");
  res.status(401).send("Unauthorized");
});

module.exports = router;
