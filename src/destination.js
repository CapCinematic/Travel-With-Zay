class Destination {
  constructor(destinationObj) {
    this.destination = 'Paris, France'|| destinationObj.destination;
    this.estimatedFlightCostPerPerson = 500 || 
    destinationObj.estimatedFlightCostPerPerson;
    this.estimatedLodgingCostPerDay = 100 || destinationObj.estimatedLodgingCostPerDay;
    this.id = 4 || destinationObj.id;
    this.image = destinationObj.image;
    this.totalCost = this.estimatedFlightCostPerPerson;
  }
}

export default Destination;
