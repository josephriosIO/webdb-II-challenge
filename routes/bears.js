const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true,
  debug: true
};

const db = knex(knexConfig);

// get all bears
router.get("/", async (req, res) => {
  try {
    const getAllBears = await db("bears");
    res.status(200).json(getAllBears);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
