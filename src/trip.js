
import { getTraveler, getTrip, getDestination } from "./data.js/getData"
import Destination from "./destination"

class Trip {
  constructor(tripObj, numTravelers, numDuration){
    this.date = tripObj.date
    this.destinationID = tripObj.destinationID
    this.destination = undefined
    this.duration = numDuration
    this.id = tripObj.id
    this.status = tripObj.status
    this.suggestedActivities = tripObj.suggestedActivities
    this.travelers = numTravelers
    this.userID = tripObj.userID
    this.totalCost = undefined
  }

  findDestination(destinations){
    const match = destinations.find((destination) => destination.id === this.destinationID)
    const destination = new Destination(match)
    this.destination = destination
    this.findCost(this.destination)
  }

  findCost(destination){
    const totalLodgingCost = destination.estimatedLodgingCostPerDay * this.duration
    const totalFlightCost = destination.estimatedFlightCostPerPerson * this.travelers
    const totalTripCost = totalLodgingCost + totalFlightCost
    const totalTripCostPlusFee = totalTripCost + (totalTripCost * .1)
    this.totalCost = totalTripCostPlusFee
    console.log(totalTripCostPlusFee)
  }
  
  
}

export default Trip