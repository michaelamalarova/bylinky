require('dotenv').config();
const mongoose = require('mongoose');
const Plant = require('./models/plant');
const dbUrl = process.env.DATABASE_URL

const plants = [
  { name: 'Jahoda', season: 'Léto' },
  { name: 'Malina', season: 'Léto' },
  { name: 'Borůvka', season: 'Léto' },
  { name: 'Třezalka', season: 'Léto' },
  { name: 'Kopřiva', season: 'Jaro' },
];

const seedDB = async () => {
  try {
    await Plant.deleteMany({});
    await Plant.insertMany(plants);
    console.log('Database seeded!');
  } catch (error) {
    console.error('Failed to seed database', error);
  } finally {
    mongoose.connection.close(); // Zavře připojení po seedování
  }
};

mongoose.connect(dbUrl)
  .then(() => {
    seedDB();
    console.log(`Connected to MongoDB: ${dbUrl}`);
  })
  .catch(err => console.error('MongoDB connection error:', err));
