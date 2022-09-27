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
const { home, styles, reset, js } = require("./loader.js");

//CONNECT HTML
// app.get("/", home);
// app.get("/styles", styles);
// app.get("/reset", reset);
// app.get("/js", js);

//GET SPELLS including Queries
app.get("/api/spells", getWizardSpells);

const port = process.env.PORT || SERVER_PORT;

app.listen(SERVER_PORT, () =>
  console.log(`server running on port ${SERVER_PORT}`)
);
