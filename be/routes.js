const express = require('express');
const plantController = require('./controllers/plantController');
const userController = require('./controllers/userController');
const recordController = require('./controllers/recordController');
const authMiddleware = require('./middleware/authMiddleware');

const router = express.Router();

//definuje GET endpoint v Express aplikaci, který se nachází na cestě /plants. Když přijde HTTP GET požadavek na tuto cestu, 
//Express spustí poskytnutou funkci. Funkce je asynchronní (používá async a await), což umožňuje efektivně pracovat s operacemi, 
//které mohou trvat delší dobu (např. dotazy do databáze).
// Druhým argumentem je asynchronní funkce, která bude zpracovávat požadavek.

// Routes for plants
router.get('/plants', plantController.getAllPlants);
router.post('/plants', plantController.createPlant);
router.get('/plants/:id', plantController.getPlantById);

// Routes for users
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);

//Profile
router.get('/profile', authMiddleware, userController.getUserProfile);
router.put('/profile', authMiddleware, userController.updateUserProfile);


// Routes for records
router.post('/records', recordController.createRecord);
router.get('/records', recordController.getAllRecords);
router.get('/records:id', recordController.getRecordById);
router.put('/records:id', recordController.updateRecord);
router.delete('/records:id', recordController.deleteRecord);
router.post('/records:id/like', recordController.likeRecord);

module.exports = router;
