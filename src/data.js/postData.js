

function makeTrip(userID, destinationID, travelers, date, duration){
  fetch("<http://localhost:3001/api/v1/trips>", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userID: userID,
    destinationID: destinationID,
    travelers: travelers,
    date: date,
    duration: duration,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    // create new Trip object and add it to currentTravelerTrips array
    console.log(data)
  })
  .catch((error) => console.log(error));
}


  export default makeTrip