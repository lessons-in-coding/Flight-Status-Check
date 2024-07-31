"use strict";

// Function to populate the select options with airport data
function htmlOption() {
  let departure = document.querySelector("#departure");
  let arrival = document.querySelector("#arrival");

  airports.forEach((ap) => {
    let option = document.createElement("option");
    option.value = ap.iata;
    option.textContent = `${ap.name} (${ap.iata})`;
    departure.appendChild(option.cloneNode(true)); // For departure
    arrival.appendChild(option); // For arrival
  });

  // airports.forEach((ap) =>{
  //   let optionAp = `<option value="${ap.iata}" > ${ap.name} (${ap.iata})></option>`;
  //   departure.insertAdjacentHTML("beforeend", optionAp);
  //   arrival.insertAdjacentHTML("beforeend", optionAp);
  // })
}

/*
// Function to generate the HTML string for options
function generateOptionsHTML() {
  let optionsHTML = '';

  airports.forEach(ap => {
    optionsHTML += `<option value="${ap.iata}">${ap.name} (${ap.iata})</option>`;
  });

  return optionsHTML;
}
*/

// Function to handle flight status checking
function checkFlight() {
  let departureIATA = document.querySelector("#departure").value;
  let arrivalIATA = document.querySelector("#arrival").value;
  let showResult = document.querySelector("#result");

  // Clear previous result
  showResult.innerHTML = "";

  // Check if both departure and arrival airports are selected
  if (!departureIATA || !arrivalIATA) {
    showResult.innerHTML = "<p class='warning'>Select both departure and arrival airports!</p>";
    return;
  }

  // Find flight details
  let flight = flights.find(
    (f) => f.departureIATA === departureIATA && f.arrivalIATA === arrivalIATA
  );

  let departureAp = airports.find((a) => a.iata === departureIATA);
  let arrivalAp = airports.find((a) => a.iata === arrivalIATA);

  // Display flight status
  showResult.innerHTML = generateFlightStatusHTML(
    flight, //time, status, date, duration
    departureAp, //departure airport name and iata
    arrivalAp //arrival airport name and iata
  );
}

// Function to generate the HTML for flight status
function generateFlightStatusHTML(flight, departureAp, arrivalAp) {
  let html = "";

  if (flight && departureAp && arrivalAp) {
    html += `<h2 class="resulth2">Flight Status</h2>`;
    html += `<p class="subTitle">Departure Airport: <span class="details">${departureAp.name} (${departureAp.iata})</span></p>`;
    html += `<p class="subTitle">Arrival Airport: <span class="details">${arrivalAp.name} (${arrivalAp.iata})</span></p>`;
    html += `<p class="subTitle">Departure Time: <span class="details">${flight.departureTime}</span></p>`;
    html += `<p class="subTitle">Arrival Time: <span class="details">${flight.arrivalTime}</span></p>`;
    html += `<p class="subTitle">Departure Date: <span class="details">${flight.departureDate}</span></p>`;
    html += `<p class="subTitle">Arrival Date: <span class="details">${flight.arrivalDate}</span></p>`;
    html += `<p class="subTitle">Status: <span class="details">${flight.status}</span></p>`;
    html += `<p class="subTitle">Duration: <span class="details">${flight.duration}</span></p>`;
  } else {
    html = "<p class='error'>Flight details NOT found!</p>";
  }

  return html;
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  htmlOption();

  // Set up event listener for button
  document.querySelector("#departure").addEventListener("change", checkFlight);
  document.querySelector("#arrival").addEventListener("change", checkFlight);
  document.querySelector("#checkStatus").addEventListener("click", checkFlight);
});
