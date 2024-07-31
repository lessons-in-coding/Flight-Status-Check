// Function to populate the select elements
function htmlOption() {
  let departure = document.querySelector("#departure");
  let arrival = document.querySelector("#arrival");

  // airports.forEach((ap) => {
  //   let option = document.createElement("option");
  //   option.value = ap.iata;
  //   option.textContent = `${ap.name} (${ap.iata})`;
  //   departure.appendChild(option);
  //   arrival.appendChild(option.cloneNode(true));
  // });

  // Function to generate the HTML string for options
  function generateOptionsHTML() {
    let optionsHTML = "";

    airports.forEach((ap) => {
      optionsHTML += `<option value="${ap.iata}">${ap.name} (${ap.iata})</option>`;
    });

    return optionsHTML;
  }

  // Get the generated options HTML
  let optionsHTML = generateOptionsHTML();
  // Insert generated options into the select elements
  departure.innerHTML += optionsHTML;
  arrival.innerHTML += optionsHTML;
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

  return html; // This sends the value of 'html' back to the caller
}

// Function to display the flight status
function displayFlightStatus(flight, departureAp, arrivalAp) {
  const showResult = document.getElementById("result");
  const statusHTML = generateFlightStatusHTML(flight, departureAp, arrivalAp);
  showResult.innerHTML = statusHTML;
  // Here, statusHTML receives the returned HTML string from the generateFlightStatusHTML function and then sets the inner HTML of the element with id result to this string, effectively updating the content displayed on the page.
  // •	return is essential for passing values from a function to where it is called.
  // •	It allows you to get results from functions and use them in other parts of your code.
}

// Function to check the flight status
function checkFlight() {
  const departureIATA = document.getElementById("departure").value;
  const arrivalIATA = document.getElementById("arrival").value;

  if (!departureIATA || !arrivalIATA) {
    document.getElementById("result").innerHTML =
      "<p class='warning'>Select both departure and arrival airports!</p>";
    return;
  }

  const flight = flights.find(
    (f) => f.departureIATA === departureIATA && f.arrivalIATA === arrivalIATA
  );
  const departureAp = airports.find((a) => a.iata === departureIATA);
  const arrivalAp = airports.find((a) => a.iata === arrivalIATA);

  displayFlightStatus(flight, departureAp, arrivalAp);
}

document.addEventListener("DOMContentLoaded", () => {
  htmlOption();
  document.querySelector("#departure").addEventListener("change", checkFlight);
  document.querySelector("#arrival").addEventListener("change", checkFlight);
  document.querySelector("#checkStatus").addEventListener("click", checkFlight);
});
