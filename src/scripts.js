import "./css/styles.css";
import "./images/turing-logo.png";
import { fetchAll } from "./data.js/getData";
import Traveler from "./traveler";
import Trip from "./trip";
import Destination from "./destination";
import postTrip from "./data.js/postData";

let currentTraveler;
let currentTravelerTrips;
let destinations;
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
const table = document.querySelector(".table");
const tripRow = document.querySelector(".trip-row");
const test = document.querySelector(".test");
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
  
    checkForError(travelerData);
    destinations = travelerData[3].destinations
    populateDestinations(destinations);
    travelerData[0].travelers.map((traveler) => new Traveler(traveler));
    travelerData[2].trips
      .filter((trip) => trip.userID === 1)
      .map((trip) => new Trip(trip));
    currentTraveler = new Traveler(travelerData[1]);
    currentTravelerTrips = travelerData[2].trips
      .filter((trip) => trip.userID === currentTraveler.id)
      .map((trip) => {
        const newTrip = new Trip(trip, trip.travelers, trip.duration);
        newTrip.findDestination(travelerData[3].destinations);
        return newTrip;
      });
    if (passwordInput.value === "traveler") {
      displayTrips(currentTravelerTrips);
    }
  });
}
function checkForError(data) {
  const error = data.some((dataSet) => {
    if (dataSet.message === "Failed to fetch") {
      return true;
    }
  });
  if (error) alert("Server Down! Try Again Soon!");
}

function populateDestinations(destinations) {
  destinations.forEach((des) => {
    let destinationOption = `<option id=${des.id} value=${des.id}>${des.destination}</option>`;
    selectDestination.innerHTML += destinationOption;
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
  `;
  const logInButton = document.querySelector(".view-traveler-data");
  logInButton.addEventListener("click", getData);
}

function displayTrips(data) {

  table.innerHTML = "";
  table.classList.remove("hidden");
  logInInput.classList.add("hidden");
  homeButton.classList.remove("hidden");
  planTripButton.classList.remove("hidden");
  data.forEach((trip) => {
   
    let tripUpdate = `<tr>
      <td>${trip.date}</td>
      <td>${trip.status}</td>
      <td>${trip.destination.destination}</td>
 <td>${trip.travelers}</td>
<td>${trip.destination.estimatedFlightCostPerPerson}</td>
<td>${trip.destination.estimatedLodgingCostPerDay}</td>
<td>${trip.totalCost}</td>
<td><img src="${trip.destination.image}" alt="${trip.destination}" height="100px"  width="200px"/></td> 
      
    </tr>`;
    table.innerHTML += tripUpdate;
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

  postTrip(
    userId,
    destinationId,
    travelers,
    date,
    duration,
    status,
    suggestedActivities
  ).then((newTrip) => {
    const tripToAdd = new Trip(newTrip.newTrip, travelers, duration)
    tripToAdd.findDestination(destinations)
   currentTravelerTrips.push(tripToAdd)
    displayTrips(currentTravelerTrips);
  });
}
