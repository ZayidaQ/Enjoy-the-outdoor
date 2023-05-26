//Author: Zhayida Haishan

// ------- script ------- //

import { mountainsArray } from "./mountainData.js";
import { createNewDropdown } from "./script.js";

const mountainsList = document.querySelector("#mountainsList");
const displayMountainInfo = document.querySelector("#displayMountainInfo");

// On page load
window.onload = () => {
  createNewDropdown(getMountainNames(mountainsArray), "#mountainsList");
  mountainsList.addEventListener("change", createMountainInfoCard);
};

// Get mountain names from the array
function getMountainNames(array) {
  return array.map((obj) => obj.name).sort();
}

// Create info card for the selected mountain and display
function createMountainInfoCard() {
  const selectedMountain = mountainsList.value;
  const mountain = mountainsArray.find((obj) => obj.name === selectedMountain);

  displayMountainInfo.innerHTML = `
  <div class="card mb-3 mountain-card">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="images/${mountain.img}" class="card-img-top img-fluid mountain-image" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title mountain-title">${mountain.name}</h5>
          <p class="card-text mountain-description">${mountain.desc}</p>
          <p class="card-text mountain-info">Elevation: ${mountain.elevation} feet</p>
          <p class="card-text mountain-info">Effort: ${mountain.effort}</p>
          <p><i class="bi bi-sunrise"></i> Sunrise: <span id="sunriseTime"></span> UTC</p>
          <p><i class="bi bi-sunset-fill"></i> Sunset: <span id="sunsetTime"></span> UTC</p>
        </div>
      </div>
    </div>
  </div>`;




  const sunriseTime = document.querySelector("#sunriseTime");
  const sunsetTime = document.querySelector("#sunsetTime");

  getSunsetForMountain(mountain.coords.lat, mountain.coords.lng)
    .then((data) => {
      sunriseTime.textContent = data.results.sunrise;
      sunsetTime.textContent = data.results.sunset;
    });
}

// Function to fetch the sunrise/sunset times
async function getSunsetForMountain(lat, lng) {
  const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
  const data = await response.json();
  return data;
}

