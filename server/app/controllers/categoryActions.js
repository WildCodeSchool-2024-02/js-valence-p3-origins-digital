const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const categories = await tables.category.readAll();

    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const insertedId = await tables.category.create(req.body.category);
    res.status(201).json({ insertedId });
  } catch (err) {
    next(err);
  }
};

module.exports = { browse, add };
