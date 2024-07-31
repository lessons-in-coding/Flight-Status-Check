"use strict";

// Function to populate the select options with airport data
function htmlOption() {
  let departure = document.querySelector("#departure");
  let arrival = document.querySelector("#arrival");

  for (let i = 0; i < airports.length; i++) {
    let ap = airports[i];
    let option = document.createElement("option");
    option.value = ap.iata;
    option.textContent = `${ap.name} (${ap.iata})`;
    departure.appendChild(option);
    arrival.appendChild(option.cloneNode(true));
  }
  //   airports.forEach((ap) => {
  //     let option = document.createElement("option");
  //     option.value = ap.iata;
  //     option.textContent = `${ap.name} (${ap.iata})`;
  //     departure.appendChild(option.cloneNode(true)); // For departure
  //     arrival.appendChild(option); // For arrival
  //   });

  // airports.forEach((ap) =>{
  //   let optionAp = `<option value="${ap.iata}" > ${ap.name} (${ap.iata})></option>`;
  //   departure.insertAdjacentHTML("beforeend", optionAp);
  //   arrival.insertAdjacentHTML("beforeend", optionAp);
  // })
}

// Function to handle flight status checking
function checkFlight() {
  let departureIATA = document.querySelector("#departure").value;
  let arrivalIATA = document.querySelector("#arrival").value;
  let showResult = document.querySelector("#result");

  // Clear previous result
  showResult.innerHTML = "";

  // Check if both departure and arrival airports are selected
  if (!departureIATA || !arrivalIATA) {
    showResult.innerHTML = `<p class="warning">Select both departure and arrival airports!</p>`;
    return;
  }

  // Find flight details
  let flight = flights.find(
    (f) => f.departureIATA === departureIATA && f.arrivalIATA === arrivalIATA
  );

  let departureAp = airports.find((a) => a.iata === departureIATA);
  let arrivalAp = airports.find((a) => a.iata === arrivalIATA);

  // Check if flight and airport details are found
  if (flight && departureAp && arrivalAp) {
    showResult.innerHTML = `
      <h2 class="resulth2">Flight Status</h2>
      <p class="subTitle">Departure Airport: <span class="details">${departureAp.name} (${departureAp.iata})</span></p>
      <p class="subTitle">Arrival Airport: <span class="details">${arrivalAp.name} (${arrivalAp.iata})</span></p>
      <p class="subTitle">Departure Time: <span class="details">${flight.departureTime}</span></p>
      <p class="subTitle">Arrival Time: <span class="details">${flight.arrivalTime}</span></p>
      <p class="subTitle">Departure Date: <span class="details">${flight.departureDate}</span></p>
      <p class="subTitle">Arrival Date: <span class="details">${flight.arrivalDate}</span></p>
      <p class="subTitle">Status: <span class="details">${flight.status}</span></p>
      <p class="subTitle">Duration: <span class="details">${flight.duration}</span></p>
    `;
  } else {
    showResult.innerHTML = `<p class="error">Flight details NOT found!</p>`;
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  htmlOption();

  // Set up event listeners for select elements and button
  document.querySelector("#departure").addEventListener("change", checkFlight);
  document.querySelector("#arrival").addEventListener("change", checkFlight);
  document.querySelector("#checkStatus").addEventListener("click", checkFlight);
});
