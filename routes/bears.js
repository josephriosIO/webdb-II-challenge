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

// get certain bear by id
router.get("/:id", async (req, res) => {
  try {
    const getBear = await db("bears")
      .where({ id: req.params.id })
      .first();
    if (!getBear) {
      res.status(404).json({ msg: "id not found" });
    } else {
      res.status(200).json(getBear);
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

//delete bear
router.delete("/:id", async (req, res) => {
  try {
    const getDeletedbear = await db("bears")
      .where({ id: req.params.id })
      .first();
    const deleteBear = await db("bears")
      .where({ id: req.params.id })
      .delete(req.body);
    if (!getDeletedbear) {
      res.status(404).json({ msg: "no id found to delete" });
    } else {
      res.status(200).json(getDeletedbear);
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

//update bear
router.put("/:id", async (req, res) => {
  if (!req.body.name) {
    return res.status(404).json({ msg: "please enter name for bear" });
  }
  try {
    const updateBear = await db("bears")
      .where({ id: req.params.id })
      .update(req.body);
    const getUpdatedBear = await db("bears")
      .where({ id: req.params.id })
      .first();
    if (!getUpdatedBear) {
      res.status(404).json({ msg: "id not found to update bear" });
    } else {
      res.status(200).json(getUpdatedBear);
    }
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});

module.exports = router;
