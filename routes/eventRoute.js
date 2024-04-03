
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/create',  eventController.createEvent);
router.get('/getallevents', eventController.getAllEvents);
router.get('/getevent/:id', eventController.getEventById);
router.delete('/deleteevent/:id', authMiddleware.verifyToken, eventController.deleteEventById);
router.put('/updateevent/:id', eventController.editEvent);

router.post('/addfavorite/:eventId',  eventController.addFavoriteEvent);

router.post('/removefavorite/:eventId',  eventController.removeFavoriteEvent);

module.exports = router;
