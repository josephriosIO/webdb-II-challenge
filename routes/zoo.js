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
    const getAddedZoo = await db("zoos")
      .where({ id: addZoo[0] })
      .first();
    if (!getAddedZoo) {
      res.status(404).json({ msg: "no id found" });
    } else {
      res.status(201).json(getAddedZoo);
    }
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
    const getDeleteZoo = await db("zoos")
      .where({ id: req.params.id })
      .first();

    const deleteZoo = await db("zoos")
      .where({ id: req.params.id })
      .delete(req.body, "id");

    if (!getDeleteZoo) {
      res.status(404).json({ msg: "id does not exist" });
    } else {
      res.status(200).json(getDeleteZoo);
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
    const getUpdatedZoo = await db("zoos")
      .where({ id: req.params.id })
      .first();

    const updateZoo = await db("zoos")
      .where({ id: req.params.id })
      .update(req.body);

    if (updateZoo > 0) {
      res.status(200).json(getUpdatedZoo);
    } else {
      res.status(404).json({ msg: "theres no zoo to update." });
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
