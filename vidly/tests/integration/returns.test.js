const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");
let server;

describe("/api/returns", () => {
  let customerId;
  let movieId;
  let rental;

  beforeEach(async () => {
    server = require("../../index");

    customerId = mongoose.Types.ObjectId().toHexString();
    movieId = mongoose.Types.ObjectId().toHexString();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345",
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });
  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
  });

  it('should work', async () => {
      const result = await Rental.findById(rental._id);
      expect(result).not.toBeNull();

  })
});
