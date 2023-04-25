
import { getTraveler, getTrip, getDestination } from "./data.js/getData"
import Destination from "./destination"

class Trip {
  constructor(tripObj){
    this.date = tripObj.date
    this.destinationID = tripObj.destinationID
    this.destination = undefined
    this.duration = tripObj.duration
    this.id = tripObj.id
    this.status = tripObj.status
    this.suggestedActivities = tripObj.suggestedActivities
    this.travelers = tripObj.travelers
    this.userID = tripObj.userID
    
  }

  findDestination(destinations){
    const match = destinations.find((destination) => destination.id === this.destinationID)
    const destination = new Destination(match)
    this.destination = destination
  }
  
}

export default Trip