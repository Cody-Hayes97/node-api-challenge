const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();
const actionRouter = require("./api/actionRouter");
const projectRouter = require("./api/projectRouter");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

server.get("/", (req, res) => {
  res.send("hello world!");
});

module.exports = server;
