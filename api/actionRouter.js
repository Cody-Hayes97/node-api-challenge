const express = require("express");
const db = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  db.get(req.action)
    .then(act => {
      res.status(200).json(act);
    })
    .catch(err => {
      res.status(500).json({ Error: "could not access data", err });
    });
});

router.get("/:id", (req, res) => {
  db.get(req.params.id)
    .then(act => {
      if (act) {
        res.status(200).json(act);
      } else {
        res.status(404).json({ message: "That ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "could not access data", err });
    });
});

router.post("/", (req, res) => {
  const newPost = req.body;
  if (!newPost.notes || !newPost.description) {
    res.status(400).json({
      errorMessage: "Please provide notes and description for the post."
    });
  }

  db.insert(newPost)
    .then(act => {
      res.status(200).json(act);
    })
    .catch(err => {
      res.status(500).json({ Error: "could not access data", err });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  if (!changes.notes || !changes.description) {
    res.status(400).json({
      errorMessage: "Please provide notes and description for the post."
    });
  }

  db.update(req.params.id, changes)
    .then(act => {
      if (act) {
        res.status(200).json(act);
      } else {
        res.status(404).json({ message: "That ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "could not access data", err });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(act => {
      if (act) {
        res.status(200).json(act);
      } else {
        res.status(404).json({ message: "That ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "could not access data", err });
    });
});

module.exports = router;
