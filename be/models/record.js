// models/Record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  plant: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true }, // Odkaz na rostlinu
    name: { type: String, required: true } // Uložení jména rostliny
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Record', recordSchema);

/*
const recordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant', required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});
*/