import chai from 'chai';
const expect = chai.expect;
import Trip from '../src/trip';

describe('Trip', () => {
  let trip;

  beforeEach(() => {
    trip = new Trip({
      date: '2022/06/05',
      destinationID: 4,
      duration: 7,
      id: 1,
      status: 'approved',
      suggestedActivities: [],
      travelers: 2,
      userID: 1
    });
  });

  describe('constructor', () => {
    it('should create a new trip object', () => {
      expect(trip).to.be.an.instanceOf(Trip);
    });

    it('should set the trip date', () => {
      expect(trip.date).to.equal('2022/06/05');
    });

    it('should set the destination ID', () => {
      expect(trip.destinationID).to.equal(4);
    });

    it('should initialize the destination property to undefined', () => {
      expect(trip.destination).to.equal('Paris, France');
    });

    it('should set the trip duration', () => {
      expect(trip.duration).to.equal(7);
    });

    it('should set the trip ID', () => {
      expect(trip.id).to.equal(1);
    });

    it('should set the trip status', () => {
      expect(trip.status).to.equal('approved');
    });

    it('should set the suggested activities', () => {
      expect(trip.suggestedActivities).to.deep.equal([]);
    });

    it('should set the number of travelers', () => {
      expect(trip.travelers).to.equal(2);
    });

    it('should set the user ID', () => {
      expect(trip.userID).to.equal(1);
    });
  });

  describe('findDestination', () => {
    it.skip('should set the destination property', () => {
      expect(trip.destination.destination).to.deep.equal('Paris, France');
    });
  });

  describe('calculateCost', () => {
    it.skip('should calculate the total cost of the trip', () => {
      expect(trip.findCost()).to.deep.equal(2310);
    });
  });
});
