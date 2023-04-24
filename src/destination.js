
class Destination {
  constructor(destinationObj){
    this.destination = destinationObj.destination
    this.estimatedFlightCostPerPerson = destinationObj.estimatedFlightCostPerPerson
    this.estimatedLodgingCostPerDay = destinationObj.estimatedLodgingCostPerDay
    this.id = destinationObj.id
    this.image = destinationObj.image
  }
}

export default Destination