import { locationsArray } from "./locationData.js";
import { parkTypesArray } from "./parkTypeData.js";
import { nationalParksArray } from "./nationalParkData.js";

const filterSearchBy = ["Location", "Park Type"];
const filterSearchByList = document.querySelector("#filterSearchBy");
const labelSearchTypeList = document.querySelector("#labelSearchTypeList");
const searchTypeList = document.querySelector("#searchTypeList");
const divParksList = document.querySelector("#divParksList");
const parksList = document.querySelector("#parksList");
const displayParksInfo = document.querySelector("#displayParksInfo");
const btnViewAll = document.querySelector("#btnViewAll");
let filterSelect = "";

window.addEventListener("load", () => {
  nationalParksArray.forEach(obj => {
    Object.keys(obj).forEach(k => {
      if (obj[k] === 0) {
        obj[k] = "";
      }
    });
  });

  btnViewAll.addEventListener("click", onBtnViewAll);
  createNewDropdown(filterSearchBy, "#filterSearchBy");
  filterSearchByList.addEventListener("change", onChangeFilterSearchBy);
  searchTypeList.addEventListener("change", onChangeSearchTypeList);
  parksList.addEventListener("change", onChangeParksList);
  hideElement(searchTypeList);
  hideElement(divParksList);
});

export function createNewDropdown(myArrayList, nameOfDropdown) {
  const newDropdown = document.querySelector(nameOfDropdown);
  newDropdown.innerHTML = '<option>Select one</option>';
  myArrayList.forEach(element => {
    const theOption = new Option(element);
    newDropdown.appendChild(theOption);
  });
}

function onBtnViewAll() {
  resetElement(filterSearchByList);
  createNewDropdown(filterSearchBy, "#filterSearchBy");
  resetElement(displayParksInfo);
  nationalParksArray.forEach(obj => createParkInfoCard(obj));
  hideElement(labelSearchTypeList);
  hideElement(searchTypeList);
  hideElement(divParksList);
}

function onChangeFilterSearchBy() {
  const index = filterSearchByList.selectedIndex;
  const selectedText = filterSearchByList[index].text;
  resetElement(searchTypeList);
  resetElement(displayParksInfo);
  showElement(labelSearchTypeList);
  showElement(searchTypeList);
  hideElement(divParksList);

  if (selectedText === "Location") {
    labelSearchTypeList.innerHTML = "Choose a state/territory:";
    createNewDropdown(locationsArray, "#searchTypeList");
    filterSelect = "Location";
  } else if (selectedText === "Park Type") {
    labelSearchTypeList.innerHTML = "Choose a park type:";
    createNewDropdown(parkTypesArray, "#searchTypeList");
    filterSelect = "Park Type";
  } else if (selectedText === "Select one") {
    hideElement(labelSearchTypeList);
    hideElement(searchTypeList);
  }
}

function onChangeSearchTypeList() {
  const index = searchTypeList.selectedIndex;
  const selectedText = searchTypeList[index].text;
  const matching = [];
  resetElement(parksList);
  resetElement(displayParksInfo);
  // showElement(divParksList);

  nationalParksArray.filter(obj => {
    if (filterSelect === "Location") {
      if (obj.State === selectedText) {
        matching.push(obj.LocationName);
        createParkInfoCard(obj);
      }
    } else if (filterSelect === "Park Type") {
      if (obj.LocationName.toLowerCase().includes(selectedText.toLowerCase())) {
        matching.push(obj.LocationName);
        createParkInfoCard(obj);
      }
    }
  });

  createNewDropdown(matching, "#parksList");
  if (selectedText === "Select one") {
    hideElement(divParksList);
  }
  showElement(displayParksInfo);
}

function onChangeParksList() {
  const index = parksList.selectedIndex;
  const selectedText = parksList[index].text;
  resetElement(displayParksInfo);

  nationalParksArray.find(element => {
    if (element.LocationName === selectedText) {
      createParkInfoCard(element);
    }
  });
}

function createParkInfoCard(object) {
  const parkInfo = `
    <div class="col-4">
      <h5 class="card-header">${object.LocationName}</h5>
      <div class="card-body">
        <p><strong>Location ID:</strong> ${object.LocationID.toUpperCase()}</p>
        <p><strong>Address:</strong> ${object.Address}, ${object.City}, ${object.State} ${object.ZipCode}</p>
        <p><strong>Contact:</strong> ${object.Phone} ${object.Fax}</p>
      </div>
    </div>`;

  displayParksInfo.innerHTML += parkInfo;
}

function hideElement(element) {
  element.style.display = "none";
}
function showElement(element) {
  element.style.display = "flex";
}
function resetElement(element) {
  element.innerHTML = "";
}