// Author: Zhayida Haishan

import { mountainsArray } from "./mountainData.js";
import { createNewDropdown } from "./script.js";

"use strict";
const listOfMountain = document.querySelector("#mountainsList");
const mountainInfoSection = document.querySelector("#displayMountainInfo");

window.onload = () => {
  createNewDropdown(retrieveMountainNames(mountainsArray), "#mountainsList");
  listOfMountain.addEventListener("change", generateMountainCard);
};

function retrieveMountainNames(array) {
  return array.map((obj) => obj.name).sort();
}

function generateMountainCard() {
  const selectedMountainElement = listOfMountain.value;
  const mountain = mountainsArray.find((obj) => obj.name === selectedMountainElement);

  mountainInfoSection.innerHTML = `
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

  const sunriseTimeElement = document.querySelector("#sunriseTime");
  const sunsetTimeElement = document.querySelector("#sunsetTime");

  fetchSunriseSunsetTime(mountain.coords.lat, mountain.coords.lng)
    .then((data) => {
      sunriseTimeElement.textContent = data.results.sunrise;
      sunsetTimeElement.textContent = data.results.sunset;
    });
}

async function fetchSunriseSunsetTime(lat, lng) {
  const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
  const data = await response.json();
  return data;
}