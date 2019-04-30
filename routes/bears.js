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

//post new bear
router.post("/", async (req, res) => {
  if (!req.body.name) {
    res.status(404).json({ msg: "please enter name for bear" });
  }
  try {
    const addBear = await db("bears").insert(req.body, "id");
    res.status(201).json(addBear);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
module.exports = router;
