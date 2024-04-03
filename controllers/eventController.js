const Event = require('../models/eventModel');
const User = require('../models/userModel');

// const multer = require('multer');
// const path = require('path');


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); 
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   });
  
//   // Initialize multer
//   const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * 5 }, 
//   }).single('event_image'); 
  
  exports.createEvent = async (req, res) => {
      try {
        const {
          event_title,
          event_date,
          event_time,
          event_location,
          event_tags,
          event_description,
          ticket_link,
          event_image,
        } = req.body;
  
        const event = new Event({
          event_title,
          event_date,
          event_time,
          event_location,
          event_tags,
          event_description,
          ticket_link,
          event_image,
        });
  
        await event.save();
  
        res.status(201).json({ message: 'Event created successfully', event });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getEventById = async (req, res) => {
    try {
      const eventId = req.params.id;
  
      // Validate that eventId is a valid MongoDB ObjectId
      if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid event ID' });
      }
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.json({ event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.deleteEventById = async (req, res) => {
    try {
      const eventId = req.params.id;
  
      // Validate that eventId is a valid MongoDB ObjectId
      if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid event ID' });
      }
  
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Store the deleted event before deleting it
      const deletedEvent = await Event.findOne({ _id: eventId });
  
      await Event.deleteOne({ _id: eventId });
  
      res.json({
        message: 'Event deleted successfully',
        deletedEvent: deletedEvent, // Include the deleted event in the response
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

 
  exports.addFavoriteEvent = async (req, res) => {
    try {
      const {sso_token} = req.body;
      const eventId = req.params.eventId;

      // Validate that eventId is a valid MongoDB ObjectId
      if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid event ID' });
      }
  
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Check if the event is already marked as a favorite
      if (event.favEvent.isFav) {
        return res.json({ message: 'Event is already marked as a favorite', isFavorite: true });
      }
  
      // Update the event to mark it as a favorite and store the user who added it
      event.favEvent.isFav = true;
      event.favEvent.addedBy = sso_token;
      await event.save();
  
      res.json({ message: 'Event marked as a favorite successfully', isFavorite: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.removeFavoriteEvent = async (req, res) => {
    try {
      const {sso_token} = req.body;
      const eventId = req.params.eventId;
  
      // Validate that eventId is a valid MongoDB ObjectId
      if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: 'Invalid event ID' });
      }
  
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Check if the event is not marked as a favorite
      if (!event.favEvent.isFav) {
        return res.json({ message: 'Event is not marked as a favorite', isFavorite: false });
      }
  
      // Check if the user who added it as a favorite is the current user
      
      // Update the event to remove it from favorites
      event.favEvent.isFav = false;
      event.favEvent.addedBy = sso_token;
      await event.save();
  
      res.json({ message: 'Event removed from favorites successfully', isFavorite: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.editEvent = async (req, res) => {
    try {
      const eventId = req.params.id;
      const updatedData = req.body;
  
      const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
  
      if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };