const dns = require('dns');
const { MongoClient } = require('mongodb');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const uri = 'mongodb+srv://mhkproject:passcodeis123@cluster0.dqwjbw1.mongodb.net/circularRepository?retryWrites=true&w=majority';
const dbName = 'circularRepository';
const collectionName = 'userCollection';

const seedData = [
  {
    username: 'admin@112',
    password: '123456',
    role: 'admin',
  },
  {
    username: 'staff1',
    password: '123456',
    role: 'staff',
  },
];

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log('Data already exists');
      return;
    }

    await collection.insertMany(seedData);
    console.log('Seeding completed');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run();

// Run this script with:
// node backend/seed.js
