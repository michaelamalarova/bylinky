//definuje Mongoose model pro MongoDB kolekci. Model je konstrukce, která nám umožňuje interakci s konkrétní kolekcí v databázi pomocí definovaného schématu.
//mongoose.model je metoda, která vytváří nový model na základě poskytnutého názvu a schématu.
//Prvním argumentem je název modelu ('Item'
//Druhým argumentem je schéma modelu, které definuje strukturu dokumentů v kolekci.
//Model poskytuje rozhraní pro interakci s databází, umožňující snadné vytváření, čtení, aktualizaci a mazání dokumentů (CRUD operace).
//modelu muze byt vic, treba model user atd

const mongoose = require('mongoose'); 

const plantSchema = new mongoose.Schema({
  name: String,
  description: String,
  season: [String]
});

module.exports = mongoose.model('Plant', plantSchema);
