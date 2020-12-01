const mongoose = require("mongoose");
const stockSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    open: {
      type: Number,
      required: true
    },
    high: {
      type: Number
    },
    low: {
      type: Number
    },
    close: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

stockSchema.statics.add = function (req) {
  return new Promise((resolve, reject) => {
    this.create(req.body, (err, doc) => {
      if (err) return reject(err);
      return resolve(doc);
    });
  });
};

stockSchema.statics.fetch = function(skipDocs) {
  return new Promise((resolve, reject) => {
    this.find({})
      .sort({ date: -1 })
      .skip(skipDocs)
      .limit(30)
      .exec((err, data) => {
        if (err) return reject(err);
        return resolve(data);
      });
  });
};

stockSchema.statics.fetchCount = function() {
  return new Promise((resolve, reject) => {
    this.countDocuments((err, count) => {
      if (err) return reject(err);
      else return resolve(count);
    });
  });
};
module.exports = mongoose.model("stock", stockSchema);
