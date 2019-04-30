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
  //
  if (!req.body.name) {
    return res.status(404).json({ msg: "please enter a zoo name" });
  }
  try {
    const addZoo = await db("zoos").insert(req.body, "id");
    res.status(201).json(addZoo);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

//get certain zoo by id
router.get("/:id", async (req, res) => {
  try {
    const zooById = await db("zoos")
      .where({ id: req.params.id })
      .first();
    if (!zooById) {
      res.status(404).json({ msg: "id does not exist" });
    } else {
      res.status(200).json(zooById);
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

//delete zoo
router.delete("/:id", async (req, res) => {
  try {
    const deleteZoo = await db("zoos")
      .where({ id: req.params.id })
      .delete(req.body);
    if (deleteZoo > 0) {
      res.status(200).json(deleteZoo);
    } else {
      res.status(404).json({ msg: "no zoo to delete" });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

//update zoo
router.put("/:id", async (req, res) => {
  if (!req.body.name) {
    res.status(404).json({ msg: "please enter name of zoo" });
  }
  try {
    const updateZoo = await db("zoos")
      .where({ id: req.params.id })
      .update(req.body);
    if (updateZoo > 0) {
      res.status(200).json(updateZoo);
    } else {
      res.status(404).json({ msg: "theres no zoo to update." });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
module.exports = router;
