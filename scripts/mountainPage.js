//Author: Zhayida Haishan

// ------- script ------- //

import { mountainsArray } from "./mountainData.js";
import { createNewDropdown } from "./script.js";

const mountainsList = document.querySelector("#mountainsList");
const displayMountainInfo = document.querySelector("#displayMountainInfo");

window.addEventListener("load", () => {
  createNewDropdown(getMountainNames(mountainsArray), "#mountainsList");
  mountainsList.addEventListener("change", createMountainInfoCard);
});

function getMountainNames(myArrayList) {
  return myArrayList.map(obj => obj.name).sort();
}

function createMountainInfoCard() {
  const index = mountainsList.selectedIndex;
  const selectedText = mountainsList[index].text;
  displayMountainInfo.innerHTML = "";

  mountainsArray.filter(obj => obj.name === selectedText).forEach(obj => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    card.innerHTML = `
      <img src="images/${obj.img}" class="card-img-top img-fluid" alt="...">
      <h5 class="card-header">${obj.name}</h5>
      <div class="card-body">
        <p class="card-text">${obj.desc}</p>
        <p class="card-text">Elevation: ${obj.elevation} feet</p>
        <p class="card-text">Effort: ${obj.effort}</p>
      </div>
    `;
    displayMountainInfo.appendChild(card);

    const cardBody = card.querySelector(".card-body");
    getSunsetForMountain(obj.coords.lat, obj.coords.lng).then(data => {
      cardBody.innerHTML += `<p><i class="bi bi-sunrise"></i> Sunrise: ${data.results.sunrise} UTC</p>`;
      cardBody.innerHTML += `<p><i class="bi bi-sunset-fill"></i> Sunset: ${data.results.sunset} UTC</p>`;
    });
  });
}

async function getSunsetForMountain(lat, lng) {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
  );
  const data = await response.json();
  return data;
}
