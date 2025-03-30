require('dotenv').config();
const mongoose = require('mongoose');
const Record = require('./models/record'); // Importuj model Record
const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/sberatel'; // Ověř název DB

mongoose.connect(dbUrl)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Record.deleteMany({}); // ❌ Smaže všechny záznamy
    console.log('All records deleted!');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
