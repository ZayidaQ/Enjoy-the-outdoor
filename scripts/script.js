// Author: Zhayida Haishan

import { locationsArray } from "./locationData.js";
import { parkTypesArray } from "./parkTypeData.js";
import { nationalParksArray } from "./nationalParkData.js";

const searchFilters = ["Area", "Park Category"];
const filterDropdown = document.querySelector("#filterSearchBy");
const labelSearchFilter = document.querySelector("#labelSearchTypeList");
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
  createNewDropdown(searchFilters, "#filterSearchBy");
  filterDropdown.addEventListener("change", onChangeFilterSearchBy);
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
  resetElement(filterDropdown);
  createNewDropdown(searchFilters, "#filterSearchBy");
  resetElement(displayParksInfo);
  nationalParksArray.forEach(obj => createParkInfoCard(obj));
  hideElement(labelSearchFilter);
  hideElement(searchTypeList);
  hideElement(divParksList);
}

function onChangeFilterSearchBy() {
  const index = filterDropdown.selectedIndex;
  const selectedText = filterDropdown[index].text;
  resetElement(searchTypeList);
  resetElement(displayParksInfo);
  showElement(labelSearchFilter);
  showElement(searchTypeList);
  hideElement(divParksList);

  if (selectedText === "Area") {
    labelSearchFilter.innerHTML = "Choose a state/territory:";
    createNewDropdown(locationsArray, "#searchTypeList");
    filterSelect = "Area";
  } else if (selectedText === "Park Category") {
    labelSearchFilter.innerHTML = "Choose a park type:";
    createNewDropdown(parkTypesArray, "#searchTypeList");
    filterSelect = "Park Category";
  } else if (selectedText === "Select one") {
    hideElement(labelSearchFilter);
    hideElement(searchTypeList);
  }
}

function onChangeSearchTypeList() {
  const index = searchTypeList.selectedIndex;
  const selectedText = searchTypeList[index].text;
  const matching = [];
  resetElement(parksList);
  resetElement(displayParksInfo);
  showElement(divParksList);

  nationalParksArray.filter(obj => {
    if (filterSelect === "Area") {
      if (obj.State === selectedText) {
        matching.push(obj.LocationName);
        createParkInfoCard(obj);
      }
    } else if (filterSelect === "Park Category") {
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
  <div class="row">
  <div class="col">
    <div class="park-info">
      <h5 class="park-info-title">${object.LocationName}</h5>
      <div class="park-info-details">
        <p><strong>Location ID:</strong> ${object.LocationID.toUpperCase()}</p>
        <p><strong>Address:</strong> ${object.Address}, ${object.City}, ${object.State} ${object.ZipCode}</p>
        <p><strong>Contact:</strong> ${object.Phone} ${object.Fax}</p>
      </div>
    </div>
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