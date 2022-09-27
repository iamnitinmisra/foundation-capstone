require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const { default: axios } = require("axios");

module.exports = {
  //GET WIZARD SPELLS
  getWizardSpells: (req, res) => {
    console.log(req.query);
    const { level, school } = req.query;
    spells = [];

    path = `http://www.dnd5eapi.co/api/spells/`;

    //handle queries
    if (level != undefined || school != undefined) {
      path += `?`;

      //add level queries
      if (level != undefined) {
        for (let i = 0; i < level.length; i++) {
          path += `&level=${level[i]}`;
        }
      }

      //add school queries
      if (school != undefined) {
        if (typeof school == "object") {
          for (let i = 0; i < school.length; i++) {
            path += `&school=${school[i]}`;
          }
        } else {
          path += `&school=${school}`;
        }
      }
    }

    console.log(path);

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
