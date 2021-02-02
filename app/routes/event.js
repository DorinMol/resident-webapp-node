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
    const eventLogs = await EventModel.find(searchOptions).exec();
    if (eventLogs.length) {
      const average =
        eventLogs
          .map((eventLog) => eventLog.value)
          .reduce((v1, v2) => v1 + v2, 0) / eventLogs.length;
      const response = {
        type: req.params.eventType,
        value: average,
        processedCount: eventLogs.length,
      };
      res.send(JSON.stringify(response));
    } else {
      res.send(`Couldn't find any logs for the specified query!`);
    }
  } catch (err) {
    res.send("something is wrong in the back...");
    console.error(err);
  }
});

module.exports = router;
