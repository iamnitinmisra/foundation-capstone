require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const { default: axios } = require("axios");

module.exports = {
  //get ALL wizard spells
  getWizardSpells: (req, res) => {
    //object to pass back all the spell information
    spells = [];
    console.log("got into wizard spells");

    axios
      .get("https://www.dnd5eapi.co/api/classes/wizard/spells")
      .then((res) => {
        for (let i = 0; i < res.data.results.length; i++) {
          path = "http://www.dnd5eapi.co" + res.data.results[i].url;

          axios.get(path).then((res) => {
            spells[i] = res.data;
          });
        }
      });

    setTimeout(() => {
      console.log(spells.length);
      res.status(200).send(spells);
    }, 2000);
  },

  //get spells by level
  getWizardByLevel: (req, res) => {
    const { level } = req.params;
    spells = [];

    let path = `http://www.dnd5eapi.co/api/spells/?level=${level}`;

    axios.get(path).then((res) => {
      //cycle over each spell individually
      for (let i = 0; i < res.data.results.length; i++) {
        const path2 = "http://www.dnd5eapi.co" + res.data.results[i].url;

        axios.get(path2).then((res) => {
          //check that its a wizard spell
          index = res.data.classes.findIndex((obj) => {
            return obj.index == "wizard";
          });

          if (index != -1) {
            spells[i] = res.data;
          }
        });
      }
    });

    setTimeout(() => {
      console.log(spells.length);
      res.status(200).send(spells);
    }, 2000);
  },
};
