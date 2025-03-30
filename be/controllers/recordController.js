const Record = require('../models/record');
const Plant = require('../models/plant');

// Vytvoření nového záznamu
exports.createRecord = async (req, res) => {
  try {
    const { lat, lng, plant} = req.body;

    if (!lat || !lng || !plant._id || !plant.name) {
      return res.status(400).json({ error: 'Chybí data' });
    }

    const plantFound = await Plant.findById(plant._id);
    if (!plantFound) {
      return res.status(404).json({ error: 'Rostlina nenalezena' });
    }

    const newRecord = new Record({ lat, lng, plant });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: `Chyba při ukládání záznamu: ${error}` });
  }
};

// Získání všech záznamů
exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.find()
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Chyba při načítání záznamů' });
  }
};

// Získání jednoho záznamu podle ID
exports.getRecordById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).populate('plant user');
    if (!record) {
      return res.status(404).send({ error: 'Record not found' });
    }
    res.send(record);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch record' });
  }
};

// Aktualizace záznamu
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) {
      return res.status(404).send({ error: 'Record not found' });
    }
    res.send(record);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update record' });
  }
};

// Smazání záznamu
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).send({ error: 'Record not found' });
    }
    res.send({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete record' });
  }
};

// Přidání lajku
exports.likeRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).send({ error: 'Record not found' });
    }
    record.likes += 1;
    await record.save();
    res.send(record);
  } catch (error) {
    res.status(500).send({ error: 'Failed to like record' });
  }
};
