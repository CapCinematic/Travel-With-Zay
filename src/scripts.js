// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {fetchAll, fetchData} from './data.js/getData';
import Traveler from './traveler';
import Trip from './trip';
import Destination from './destination';
import postTrip from './data.js/postData';

let currentTraveler;
let currentTravelerTrips;
const logInInput = document.querySelector('.log-in')
const returningTravelerButton = document.querySelector('.returning-traveler-button')
const displayInBody = document.querySelector('.body')
const planTripButton = document.querySelector('.plan-trip-button')
const homeButton = document.querySelector('.home-button')
const travelCalendarValue = document.querySelector('.travel-calendar')
const submitTravelButton = document.querySelector('.submit-travel-data')
const datePickerValue = document.querySelector('.choose-travel-date')
const numTravelers = document.querySelector('.num-travelers')
const durationNum = document.querySelector('duration-num')
const selectDestination = document.querySelector('.select-destination')

// window.addEventListener('load', getData)
returningTravelerButton.addEventListener('click', travelerLogin)
submitTravelButton.addEventListener('click', makeTrip)
function getData(e){
  e.preventDefault()
  const nameInput = document.querySelector('.name-input')
  const passwordInput = document.querySelector('.password-input')
  const travelersId = nameInput.value.split('traveler')[1]
  fetchAll(travelersId).then((travelerData) => {
    travelerData[0].travelers.map((traveler) => new Traveler(traveler))
    travelerData[2].trips.filter((trip) => trip.userID === 1).map((trip) => new Trip(trip))
   
    // Setting Variable - replace with log in
    currentTraveler = new Traveler(travelerData[1])
    currentTravelerTrips =  travelerData[2].trips.filter((trip) => trip.userID === currentTraveler.id).map((trip) => {
      const newTrip = new Trip(trip, trip.travelers, trip.duration)
      console.log('scripLog',trip.duration)
      newTrip.findDestination(travelerData[3].destinations)
      makeTrip(currentTraveler)
      return newTrip
    })
    // Will need to do two array methods with real data
    
    // console.log(currentTraveler,currentTravelerTrips)
    // Pass Data to functions
    displayTravelerData()
  })
}


function travelerLogin (e){
  e.preventDefault()
  logInInput.innerHTML += `
  <legend>Information:</legend>
       Full Name:<br>
       <input class="name-input" type="text" name="fullname" value="" placeholder="Full Name"><br>
       Password:<br>
       <input class="password-input" type="text" name="password" value="" placeholder="Password"><br>
       <button class="view-traveler-data">Log-In</button>
  `
  const logInButton = document.querySelector('.view-traveler-data')
  logInButton.addEventListener('click', getData)
}

function displayTravelerData (){
  // displayTravelerData(currentTraveler.name, currentTravelerTrips[0].date, currentTravelerDestinations[0].destination, currentTravelerDestinations[0].estimatedFlightCostPerPerson, currentTravelerTrips[0].status
  //   )
    displayInBody.innerHTML += `
  <table class="table">
      <colgroup>
        <col span="4" style="background-color: bisque;">
        <col span="3" style="background-color: aliceblue;">
      <tr>
        <th>${currentTraveler.name}</th>
        <th>Trips Status</th>
        <th>Destinations</th>
        <th>Travelers</th>
        <th>Flight Cost</th>
        <th>Lodging Cost</th>
        <th>Total Cost Of Trip</th>
      </tr>
      </colgroup>
    </table> 
  `
  displayTrips()
}
function displayTrips(){
  const table = document.querySelector('.table')

  currentTravelerTrips.forEach(trip => {
    table.innerHTML +=` 
    <tr>
        <td>${trip.date}</td>
        <td>${trip.status}</td>
        <td>${trip.destination.destination}</td>
        <td>${trip.travelers}</td>
        <td>${trip.destination.estimatedFlightCostPerPerson}</td>
        <td>${trip.destination.estimatedLodgingCostPerDay}</td>
        <td>${trip.totalCost}</td>
    </tr>
  `
  })
 
}
function makeTrip(currentTraveler){
  const userId = currentTraveler
  const destinationId = selectDestination.value
  const numTravelers = numTravelers.value
  const date = datePickerValue.value
  const duration = durationNum.value
  postTrip(userId, destinationId, numTravelers, date, duration)
}
