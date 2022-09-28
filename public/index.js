//const axios = require("axios");
const allBtns = document.querySelectorAll(".all");

console.log("connected to index.js");

for (let i = 0; i < allBtns.length; i++) {
  allBtns[i].addEventListener("click", all);
}

//ALL SPELLS btns minus the "all" btns
function all(e) {
  //console.log(e);

  //toggle clicked button
  e.target.classList.toggle("selected-all-btn");

  //collect all selected buttons from same category
  const selected = document.querySelectorAll(".selected-all-btn");
  const selectText = [];

  //turn selected buttons into a string array
  for (let i = 0; i < selected.length; i++) {
    selectText[i] = selected[i].innerText;
  }

  //find query from selected buttons
  const query = findPath(selectText);
  console.log(query);

  axios
    .post(`/api/spells/`, { query })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// give string array of button text and returns the query path
function findPath(selected) {
  let path = "";

  for (let i = 0; i < selected.length; i++) {
    switch (selected[i]) {
      case "-0-":
        path += "&level=0";
        break;
      case "1ST":
        path += "&level=1";
        break;
      case "2ND":
        path += "&level=2";
        break;
      case "3RD":
        path += "&level=3";
        break;
      case "4TH":
        path += "&level=4";
        break;
      case "5TH":
        path += "&level=5";
        break;
      case "6TH":
        path += "&level=6";
        break;
      case "7TH":
        path += "&level=7";
        break;
      case "8TH":
        path += "&level=8";
        break;
      case "9TH":
        path += "&level=9";
        break;
      case "ABJ":
        path += "&school=abjuration";
        break;
      case "CONJ":
        path += "&school=conjuration";
        break;
      case "DIV":
        path += "&school=divination";
        break;
      case "ENCH":
        path += "&school=enchantment";
        break;
      case "EVO":
        path += "&school=evocation";
        break;
      case "ILLU":
        path += "&school=illusion";
        break;
      case "NECRO":
        path += "&school=necromancy";
        break;
      case "TRANS":
        path += "&school=transmutation";
        break;
    }
  }

  path = path.replace("&", "?");

  return path;
}
