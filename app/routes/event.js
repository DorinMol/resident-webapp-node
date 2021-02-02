const express = require("express");
const router = express.Router();
const EventModel = require("../models/event");

router.get("/:eventType/average", async (req, res) => {
  try {
    const { from, to } = req.query;
    let searchOptions = { type: req.params.eventType };
    if (from !== undefined && to !== undefined) {
      searchOptions = {
        $and: [
          { timestamp: { $gte: Number(from) } },
          { timestamp: { $lte: Number(to) } },
          { type: req.params.eventType },
        ],
      };
    }
    const { average, processedCount } = await EventModel.findAverage(
      searchOptions
    );
    if (processedCount) {
      const response = {
        type: req.params.eventType,
        value: average,
        processedCount,
      };
      res.send(JSON.stringify(response));
    } else {
      res.send(`Couldn't find any logs for the specified query!`);
    }
  } catch (err) {
    console.error(err.message);
    res.send("Something went wrong...");
  }
});

module.exports = router;
