const Plant = require('../models/plant');

exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.send(plants);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createPlant = async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.send(plant);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    res.send(plant);
  } catch (error) {
    res.status(500).send(error);
  }
};
