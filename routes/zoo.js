const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfig);

// get all zoos
router.get("/", async (req, res) => {
  try {
    const allZoos = await db("zoos");
    res.status(200).json(allZoos);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

//add a zoo to the database
router.post("/", async (req, res) => {
  if (!req.body.name) {
    return res.status(404).json({ msg: "please enter a zoo name" });
  }
  try {
    const addZoo = await db("zoos").insert(req.body, "id");
    res.json(addZoo);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
