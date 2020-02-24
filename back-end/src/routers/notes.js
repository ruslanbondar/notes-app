const express = require("express");
const Note = require("../models/notes");
const router = new express.Router();

router.post("/notes", async (req, res) => {
  const note = new Note({ ...req.body });

  try {
    await note.save();
    res.status(201).send(note);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/notes", async (req, res) => {
  try {
    const note = await Note.find({});

    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/notes/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const note = await Note.findOne({ _id });

    if (!note) {
      return res.status(404).send();
    }

    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/notes/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "title", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const note = await Note.findOne({ _id: req.params.id });

    if (!note) {
      return res.status(404).send();
    }

    updates.forEach(update => (note[update] = req.body[update]));
    await note.save();
    res.send(note);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id });

    if (!note) {
      res.status(404).send();
    }

    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/notes", async (req, res) => {
  try {
    const note = await Note.deleteMany({ completed: true });

    if (!note) {
      res.status(404).send();
    }

    res.send(note);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
