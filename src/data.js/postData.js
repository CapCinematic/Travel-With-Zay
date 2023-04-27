function postTrip(userID, destinationID, travelers, date, duration, status, suggestedActivities) {
  return fetch("http://localhost:3001/api/v1/trips", {
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
    .catch((error) => console.log(error));
}


export default postTrip

