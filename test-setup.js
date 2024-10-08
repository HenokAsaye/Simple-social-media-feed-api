import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' }); 


beforeAll(async () => {
    const dbURI = process.env.TEST_DB_URI || 'mongodb://localhost:27017/socialmediaapi-test';
    await mongoose.connect(dbURI, {
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
