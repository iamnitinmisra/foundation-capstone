require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const { SERVER_PORT, CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const { getWizardSpells } = require("./controller.js");

//GET ALL SPELLS
app.get("/api/spells", getWizardSpells);
//app.get("/api/spells", getWizardByLevel);

app.listen(SERVER_PORT, () =>
  console.log(`server running on port ${SERVER_PORT}`)
);
