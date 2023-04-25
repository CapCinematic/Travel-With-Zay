function postTrip(userID, destinationID, travelers, date, duration, status, suggestedActivities) {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: Date.now(),
      userID: userID,
      destinationID: destinationID,
      travelers: travelers,
      date: date,
      duration: duration,
      status: status,
      suggestedActivities: suggestedActivities
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // create new Trip object and add it to currentTravelerTrips array
      console.log(data);
    })
    .catch((error) => console.log(error));
}

export default postTrip;

// id: <number>, userID: <number>, destinationID: <number>, travelers: <number>, date: <string 'YYYY/MM/DD'>, duration: <number>, status: <string 'approved' or 'pending'>, suggestedActivities: <array of strings></array>
