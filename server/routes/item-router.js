const express = require('express');

const ExamController = require('../controllers/exam-controller');
const PatientController = require('../controllers/patient-controller');

const router = express.Router();

router.get('/items', ExamController.getItems);
router.get('/item/:id', ExamController.getItemById);
router.post('/item', ExamController.createItem);
router.put('/item/:id', ExamController.updateItem);
router.delete('/item/:id', ExamController.deleteItem);

router.get('/items', PatientController.getItems);
router.get('/item/:id', PatientController.getItemById);
router.post('/item', PatientController.createItem);
router.put('/item/:id', PatientController.updateItem);
router.delete('/item/:id', PatientController.deleteItem);

module.exports = router;
