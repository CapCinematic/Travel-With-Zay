import "./css/styles.css";
import "./images/turing-logo.png";
import { fetchAll, fetchData } from "./data.js/getData";
import Traveler from "./traveler";
import Trip from "./trip";
import Destination from "./destination";
import postTrip from "./data.js/postData";

let currentTraveler;
let currentTravelerTrips;
const logInInput = document.querySelector(".log-in");
const planTripButton = document.querySelector(".plan-trip-button");
const homeButton = document.querySelector(".home-button");
const submitTravelButton = document.querySelector(".submit-travel-data");
const datePickerValue = document.querySelector(".choose-travel-date");
const numTravelers = document.querySelector(".num-travelers");
const durationNum = document.querySelector(".duration-num");
const selectDestination = document.querySelector(".select-destination");
const makeTripForm = document.querySelector(".make-trip-form");
const travelerSection = document.querySelector(".traveler-data-section");
window.addEventListener("load", travelerLogin);
submitTravelButton.addEventListener("click", makeTrip);
planTripButton.addEventListener("click", viewForm);




function getData(e) {
  e.preventDefault();
  homeButton.classList.remove("hidden");
  planTripButton.classList.remove("hidden");
  const nameInput = document.querySelector(".name-input");
  const passwordInput = document.querySelector(".password-input");
  const travelersId = nameInput.value.split("traveler")[1];
  fetchAll(travelersId).then((travelerData) => {
    travelerData[0].travelers.map((traveler) => new Traveler(traveler));
    travelerData[2].trips
      .filter((trip) => trip.userID === 1)
      .map((trip) => new Trip(trip));
    currentTraveler = new Traveler(travelerData[1]);
    currentTravelerTrips = travelerData[2].trips
      .filter((trip) => trip.userID === currentTraveler.id)
      .map((trip) => {
        const newTrip = new Trip(trip, trip.travelers, trip.duration);
        console.log("scripLog", trip.duration);
        newTrip.findDestination(travelerData[3].destinations);
        return newTrip;
      });
      if(passwordInput.value === 'traveler'){
        displayTravelerData();
        console.log(currentTraveler);
      }
  });
}

function travelerLogin(e) {
  e.preventDefault();
  logInInput.innerHTML = `
  <legend alt="Log In Information">Log In Information:</legend>
       TravelerID:<br>
       <input class="name-input" type="text" name="fullname" value="" placeholder="travelerID" alt="Traveler Id Input"><br>
       Password:<br>
       <input class="password-input" type="text" name="password" value="" placeholder="Password(traveler)" alt="Traveler Password Input"><br>
       <button class="view-traveler-data">Log-In</button>
  `
  const logInButton = document.querySelector(".view-traveler-data");
  logInButton.addEventListener("click", getData)
}

function displayTravelerData() {
  homeButton.classList.remove("hidden");
  planTripButton.classList.remove("hidden");
  travelerSection.innerHTML = `
  <table class="table" view alt="Table Of Trip Information">
      <colgroup>
        <col span="4" style="background-color: bisque;">
        <col span="4" style="background-color: aliceblue;">
      <tr>
        <th>${currentTraveler.name}</th>
        <th>Trips Status</th>
        <th>Destinations</th>
        <th>Travelers</th>
        <th>Flight Cost</th>
        <th>Lodging Cost</th>
        <th>Total Cost Of Trip</th>
        <th>Memories</th>
      </tr>
      </colgroup>
    </table> 
  `;
  displayTrips();
}

function displayTrips() {
  const table = document.querySelector(".table");
  logInInput.classList.add("hidden");
  currentTravelerTrips.forEach((trip) => {
    table.innerHTML += ` 
    <tr>
        <td>${trip.date}</td>
        <td>${trip.status}</td>
        <td>${trip.destination.destination}</td>
        <td>${trip.travelers}</td>
        <td>${trip.destination.estimatedFlightCostPerPerson}</td>
        <td>${trip.destination.estimatedLodgingCostPerDay}</td>
        <td>${trip.totalCost}</td>
        <td><img src="${trip.destination.image}" height="100px" width="200px"/></td>
    </tr>
  `;
  });
}

function viewForm() {
  makeTripForm.classList.remove("hidden");
  logInInput.classList.add("hidden");
}

function makeTrip(e) {
  e.preventDefault();
  const [year, month, day] = datePickerValue.value.split("-");
  makeTripForm.classList.remove("hidden");
  const userId = currentTraveler.id;
  const destinationId = Number(selectDestination.value);
  const travelers = numTravelers.value;
  const date = `${year}/${month}/${day}`;
  const duration = durationNum.value;
  const status = "pending";
  const suggestedActivities = [];
  postTrip(userId, destinationId, travelers, date, duration, status, suggestedActivities);
}
