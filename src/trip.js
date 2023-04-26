import Destination from "./destination"
class Trip {
  constructor(tripObj, numTravelers, numDuration){
    this.date = '2022/06/05' || tripObj.date;
    this.destinationID = 4 || tripObj.destinationID;
    this.destination = 'Paris, France' || undefined;
    this.duration = 7 || numDuration;
    this.id = 1 || tripObj.id;
    this.status = 'approved' || tripObj.status;
    this.suggestedActivities = [] || tripObj.suggestedActivities;
    this.travelers = 2 || numTravelers;
    this.userID = 1 || tripObj.userID;
    this.totalCost = undefined;
  }

  findDestination(destinations){
    const match = destinations.find((destination) => destination.id === this.destinationID);
    const destination = new Destination(match);
    this.destination = destination;
    this.findCost(this.destination);
  }

  findCost(destination){
    const totalLodgingCost = destination.estimatedLodgingCostPerDay * this.duration;
    const totalFlightCost = destination.estimatedFlightCostPerPerson * this.travelers;
    const totalTripCost = totalLodgingCost + totalFlightCost;
    const totalTripCostPlusFee = totalTripCost + (totalTripCost * .1);
    this.totalCost = totalTripCostPlusFee;
  }
}

export default Trip