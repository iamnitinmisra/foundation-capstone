require("dotenv").config();

const axios = require("axios");

let spells = [];

module.exports = {
  //GET WIZARD SPELLS
  getWizardSpells: (req, res) => {
    // console.log(req.body);
    const queryString = req.body.query;

    let path = `http://www.dnd5eapi.co/api/spells/`;
    path += queryString;

    // console.log(path);

    axios.get(path).then(async (res1) => {
      let allSpellUrls = [];

      //cycle over each spell individually
      res1.data.results.forEach((e, i) => {
        const spellUrl = "http://www.dnd5eapi.co" + e.url;
        allSpellUrls.push(axios.get(spellUrl));
      });

      const allWizardSpells = await fetchAllSpells(allSpellUrls);
      res.status(200).send(allWizardSpells);
    });
  },
};

function fetchAllSpells(allSpellUrls) {
  return Promise.all(allSpellUrls).then((response) => {
    spells = [];
    response.forEach((e) => {
      index = e.data.classes.findIndex((obj) => {
        return obj.index == "wizard";
      });

      if (index != -1 || !index) {
        spells.push(e.data);
      }
    });
    //check that its a wizard spell
    return spells;
  });
}
