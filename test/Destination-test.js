import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/destination';

describe('Destination', () => {
  let destination;

  beforeEach(() => {
    destination = new Destination({
      destination: 'Paris, France',
      estimatedFlightCostPerPerson: 500,
      estimatedLodgingCostPerDay: 100,
      id: 4,
      image: 'Image'
    });
  });

  describe('constructor', () => {
    it('should create a new destination object', () => {
      expect(destination).to.be.an.instanceOf(Destination);
    });

    it('should find the a destination', () => {
      expect(destination.destination).to.equal('Paris, France');
    });

    it('should find the estimated flight cost per person', () => {
      expect(destination.estimatedFlightCostPerPerson).to.equal(500);
    });

    it('should find the estimated lodging cost per day', () => {
      expect(destination.estimatedLodgingCostPerDay).to.equal(100);
    });

    it('should find the destination ID', () => {
      expect(destination.id).to.equal(4);
    });

    it('should find the destination image', () => {
      expect(destination.image).to.equal(
        'Image'
      );
    });
  });
});