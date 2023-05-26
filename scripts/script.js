import { locationsArray } from "./locationData.js";
import { parkTypesArray } from "./parkTypeData.js";
import { nationalParksArray } from "./nationalParkData.js";

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
    for (const key in obj) {
      if (obj[key] === 0) {
        obj[key] = "";
      }
    }
  });

  btnViewAll.addEventListener("click", onBtnViewAll);
  createNewDropdown(filterSearchByList, ["Location", "Park Type"]);
  filterSearchByList.addEventListener("change", onChangeFilterSearchBy);
  searchTypeList.addEventListener("change", onChangeSearchTypeList);
  parksList.addEventListener("change", onChangeParksList);
  hideElement(searchTypeList);
  hideElement(divParksList);
});

function createNewDropdown(dropdown, options) {
  dropdown.innerHTML = '<option>Select one</option>';
  options.forEach(option => {
    dropdown.innerHTML += `<option>${option}</option>`;
  });
}

function onBtnViewAll() {
  resetElement(filterSearchByList);
  createNewDropdown(filterSearchByList, ["Location", "Park Type"]);
  resetElement(displayParksInfo);
  nationalParksArray.forEach(createParkInfoCard);
  hideElement(labelSearchTypeList);
  hideElement(searchTypeList);
  hideElement(divParksList);
}

function onChangeFilterSearchBy() {
  const selectedText = filterSearchByList.value;
  resetElement(searchTypeList);
  resetElement(displayParksInfo);
  showElement(labelSearchTypeList);
  showElement(searchTypeList);
  hideElement(divParksList);

  if (selectedText === "Location") {
    labelSearchTypeList.innerHTML = "Choose a state/territory:";
    createNewDropdown(searchTypeList, locationsArray);
    filterSelect = "Location";
  } else if (selectedText === "Park Type") {
    labelSearchTypeList.innerHTML = "Choose a park type:";
    createNewDropdown(searchTypeList, parkTypesArray);
    filterSelect = "Park Type";
  } else {
    hideElement(labelSearchTypeList);
    hideElement(searchTypeList);
  }
}

function onChangeSearchTypeList() {
  const selectedText = searchTypeList.value;
  const matching = [];
  resetElement(parksList);
  resetElement(displayParksInfo);
  showElement(divParksList);

  nationalParksArray.forEach(obj => {
    if (
      (filterSelect === "Location" && obj.State === selectedText) ||
      (filterSelect === "Park Type" && obj.LocationName.toLowerCase().includes(selectedText.toLowerCase()))
    ) {
      matching.push(obj.LocationName);
      createParkInfoCard(obj);
    }
  });

  createNewDropdown(parksList, matching);
  if (selectedText === "Select one") {
    hideElement(divParksList);
  }
  showElement(displayParksInfo);
}

function onChangeParksList() {
  const selectedText = parksList.value;
  resetElement(displayParksInfo);

  nationalParksArray.forEach(obj => {
    if (obj.LocationName === selectedText) {
      createParkInfoCard(obj);
    }
  });
}

function createParkInfoCard(object) {
  const parkInfo = `
    <div class="row">
      <div class="col">
        <div class="park-info animated fadeIn">
          <h5 class="park-info-title">${object.LocationName}</h5>
          <div class="park-info-details">
            <p><strong>Location ID:</strong> ${object.LocationID.toUpperCase()}</p>
            <p><strong>Address:</strong> ${object.Address}, ${object.City}, ${object.State} ${object.ZipCode}</p>
            <p><strong>Contact:</strong> ${object.Phone} ${object.Fax}</p>
          </div>
        </div>
      </div>
    </div>`;

  displayParksInfo.insertAdjacentHTML("beforeend", parkInfo);
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
