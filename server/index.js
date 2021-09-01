const express = require('express');
const dotenv = require('dotenv');
const db = require("./src/models");
const router = require('./src/routes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

db.sequelize.sync();

app.listen(process.env.API_PORT, () => {
  console.log(`Server is listening on port: ${process.env.API_PORT}`);
});