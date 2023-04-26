import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/traveler';


describe('Traveler', () => {
  let traveler;

  beforeEach(() => {
    traveler = new Traveler({
      id: 1,
      name: 'John Smith',
      travelerType: 'business'
    });
  });

  describe('constructor', () => {
    it('should create a new traveler object', () => {
      expect(traveler).to.be.an.instanceOf(Traveler);
    });

    it('should set the traveler ID', () => {
      expect(traveler.id).to.equal(1);
    });

    it('should set the traveler name', () => {
      expect(traveler.name).to.equal('John Smith');
    });

    it('should set the traveler type', () => {
      expect(traveler.travelType).to.equal('business');
    });

    it('should initialize an empty trips array', () => {
      expect(traveler.trips).to.deep.equal([]);
    });
  });
});