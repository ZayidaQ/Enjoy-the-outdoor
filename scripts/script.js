// Author: Zhayida Haishan

import { locationsArray } from "./locationData.js";
import { parkTypesArray } from "./parkTypeData.js";
import { nationalParksArray } from "./nationalParkData.js";

const searchFilters = ["Area", "Park Category"];
const filterDropdown = document.querySelector("#filterSearchBy");
const labelSearchFilter = document.querySelector("#labelSearchTypeList");
const searchFilterDropdown = document.querySelector("#searchTypeList");
const parksContainer = document.querySelector("#divParksList");
const parksList = document.querySelector("#parksList");
const displayParksInfo = document.querySelector("#displayParksInfo");
const btnShowAll = document.querySelector("#btnViewAll");
let selectedFilter = "";

window.addEventListener("load", () => {
  nationalParksArray.forEach(obj => {
    Object.keys(obj).forEach(k => {
      if (obj[k] === 0) {
        obj[k] = "";
      }
    });
  });

  btnShowAll.addEventListener("click", onBtnViewAll);
  createNewDropdown(searchFilters, "#filterSearchBy");
  filterDropdown.addEventListener("change", onChangeFilterSearchBy);
  searchFilterDropdown.addEventListener("change", onChangeSearchTypeList);
  parksList.addEventListener("change", onChangeParksList);
  hideElement(searchFilterDropdown);
  hideElement(parksContainer);
});

export function createNewDropdown(ArrayList, nameOfDropdown) {
  const newDropdown = document.querySelector(nameOfDropdown);
  newDropdown.innerHTML = '<option>Select</option>';
  ArrayList.forEach(element => {
    const theOption = new Option(element);
    newDropdown.appendChild(theOption);
  });
}

function onBtnViewAll(event) {
  event.preventDefault();
  resetElement(filterDropdown);
  createNewDropdown(searchFilters, "#filterSearchBy");
  resetElement(displayParksInfo);
  nationalParksArray.forEach(obj => createParkInfoCard(obj));
  hideElement(labelSearchFilter);
  hideElement(searchFilterDropdown);
  hideElement(parksContainer);
}

function onChangeFilterSearchBy() {
  const index = filterDropdown.selectedIndex;
  const selectedText = filterDropdown[index].text;
  resetElement(searchFilterDropdown);
  resetElement(displayParksInfo);
  showElement(labelSearchFilter);
  showElement(searchFilterDropdown);
  hideElement(parksContainer);

  if (selectedText === "Area") {
    labelSearchFilter.innerHTML = " ";
    createNewDropdown(locationsArray, "#searchTypeList");
    selectedFilter = "Area";
  } else if (selectedText === "Park Category") {
    labelSearchFilter.innerHTML = " ";
    createNewDropdown(parkTypesArray, "#searchTypeList");
    selectedFilter = "Park Category";
  } else if (selectedText === "Select one") {
    hideElement(labelSearchFilter);
    hideElement(searchFilterDropdown);
  }
}

function onChangeSearchTypeList() {
  const index = searchFilterDropdown.selectedIndex;
  const selectedText = searchFilterDropdown[index].text;
  const matching = [];
  resetElement(parksList);
  resetElement(displayParksInfo);
  showElement(parksContainer);

  nationalParksArray.filter(obj => {
    if (selectedFilter === "Area") {
      if (obj.State === selectedText) {
        matching.push(obj.LocationName);
        createParkInfoCard(obj);
      }
    } else if (selectedFilter === "Park Category") {
      if (obj.LocationName.toLowerCase().includes(selectedText.toLowerCase())) {
        matching.push(obj.LocationName);
        createParkInfoCard(obj);
      }
    }
  });

  createNewDropdown(matching, "#parksList");
  if (selectedText === "Select one") {
    hideElement(parksContainer);
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
          <h5 class="park-info-title" style="font-weight: bold;">${object.LocationName}</h5>
          <div class="park-info-details">
            <p><strong>Location ID:</strong> ${object.LocationID.toUpperCase()}</p>
            <p><strong>Address:</strong> ${object.Address}, ${object.City}, ${object.State} ${object.ZipCode}</p>
            <p><strong>Contact:</strong> ${object.Phone} ${object.Fax}</p>
            <a href="${object.Visit}" target="_blank" >Visit</a>
          </div>
        </div>
      </div>
    </div>`;

  displayParksInfo.innerHTML += parkInfo;
}

// function createParkInfoCard(object) {
//   const parkInfo = `
//     <div class="row">
//       <div class="col">
//         <div class="park-info">
//           <h5 class="park-info-title">
//             <a>${object.Visit}</a>
//           </h5>
//           <div class="park-info-details">
//             <p><strong>Location ID:</strong> ${object.LocationID.toUpperCase()}</p>
//             <p><strong>Address:</strong> ${object.Address}, ${object.City}, ${object.State} ${object.ZipCode}</p>
//             <p><strong>Contact:</strong> ${object.Phone} ${object.Fax}</p>
//           </div>
//         </div>
//       </div>
//     </div>`;
//   displayParksInfo.innerHTML += parkInfo;
// }




function hideElement(element) {
  element.style.display = "none";
}
function showElement(element) {
  element.style.display = "flex";
}
function resetElement(element) {
  element.innerHTML = "";
}