const express = require("express");
const helmet = require("helmet");

const zooRouter = require("./routes/zoo");
const bearRouter = require("./routes/bears");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/zoos", zooRouter);
server.use("/api/bears", bearRouter);

module.exports = server;
