const stock = require("./models");
const responseFactory = require("./response");

const getStocks = async (req, res, next) => {
  try {
    let { page } = req.query;
    page = page || 1;
    const skipDocs = page * 30 - 30;
    let count;
    let docs = [];
    if (page == 1) count = await stock.fetchCount();
    docs = await stock.fetch(skipDocs);
    responseFactory.sendSuccess({ res, data: { list: docs, count } });
  } catch (err) {
    responseFactory.sendForbidden({
      res,
      message: `failed to fetch records - ${err}`
    });
  }
};

const addStock = async (req, res, next) => {
  try {
      let doc = await stock.add(req);
        responseFactory.sendSuccess({
          res,
          message: "doc created sucessfully",
          data: doc
        });
  } catch (err) {
    responseFactory.sendForbidden({
      res,
      message: `doc creation failed - ${err.message}`
    });
  }
};

module.exports = {
  getStocks,
  addStock
};
