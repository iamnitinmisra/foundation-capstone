require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const { default: axios } = require("axios");

module.exports = {
  home: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  },

  styles: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.css"));
  },

  reset: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/reset.css"));
  },

  js: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.js"));
  },
};
