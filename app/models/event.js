const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  type: String,
  timestamp: Number,
  value: Number,
});

const EventModel = mongoose.model("eventLog", eventSchema);

const findAverage = async (searchOptions) => {
  try {
    const eventLogs = await EventModel.find(searchOptions).exec();

    return {
      average:
        eventLogs
          .map((eventLog) => eventLog.value)
          .reduce((v1, v2) => v1 + v2, 0) / eventLogs.length,
      processedCount: eventLogs.length,
    };
  } catch (err) {
    console.error(err.message);
    return {
      average: 0,
      processedCount: 0,
    };
  }
};

module.exports = {
  findAverage,
};
