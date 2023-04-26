class Traveler {
  constructor (travelerObj){
    this.id = travelerObj.id, 
    this.name = 'John Smith'||travelerObj.name, 
    this.travelType = 'business' || travelerObj.travelerType
    this.trips = []
  }

}
export default Traveler