const express = require("express");
const db = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/", (req, res) => {
  db.get(req.project)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      res.status(500).json({ Error: "Could not access database", err });
    });
});

router.get("/:id", (req, res) => {
  db.get(req.params.id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "That ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "could not access data", err });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;
  if (!newProject.name || !newProject.description) {
    res.status(400).json({
      errorMessage: "Please provide name and description for the post."
    });
  }
  db.insert(newProject)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ Error: "could not access data", err });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  if (!changes.name || !changes.description) {
    res.status(400).json({
      errorMessage: "Please provide name and description for the post."
    });
  }

  db.update(req.params.id, changes)
    .then(project => {
      if (project) {
        res.status(200).json(project);
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
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "That ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ Error: "could not access data", err });
    });
});

router.get("/:id/actions", (req, res) => {
  db.getProjectActions(req.params.id)
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
