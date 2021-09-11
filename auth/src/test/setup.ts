import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUrl = await mongo.getUri();
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collectons = await mongoose.connection.db.collections();
  for (let collection of collectons) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
