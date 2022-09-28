require("dotenv").config();

const { CONNECTION_STRING } = process.env;

const { default: axios } = require("axios");

let spells = [];

module.exports = {
  //GET WIZARD SPELLS
  getWizardSpells: (req, res) => {
    console.log(req.body);
    const queryString = req.body.query;
    spells = [];
    let timeout = 5000;

    let path = `http://www.dnd5eapi.co/api/spells/`;
    path += queryString;

    console.log(path);

    axios.get(path).then((res) => {
      let allSpellUrls = [];
      //cycle over each spell individually
      for (let i = 0; i < res.data.results.length; i++) {
        const spellUrl = "http://www.dnd5eapi.co" + res.data.results[i].url;
        allSpellUrls.push(axios.get(spellUrl));
      }

      console.log(allSpellUrls);
      Promise.all(allSpellUrls).then((res) => {
        console.log(res);
        //check that its a wizard spell
        index = res.data.classes.findIndex((obj) => {
          return obj.index == "wizard";
        });

        if (index != -1) {
          spells.push(res.data);
        }
      });
    });

    setTimeout(() => {
      console.log(spells.length);
      res.status(200).send(spells);
    }, timeout);
  },
};

function getSpell(spellUrl) {
  axios.get(spellUrl).then((res) => {
    //check that its a wizard spell
    index = res.data.classes.findIndex((obj) => {
      return obj.index == "wizard";
    });

    if (index != -1) {
      spells.push(res.data);
    }
  });
}
