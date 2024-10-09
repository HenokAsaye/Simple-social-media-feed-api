import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 


beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});
afterAll(async () => {
    await mongoose.disconnect();
});
afterEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});