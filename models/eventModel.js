const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_title: { type: String, required: true },
  event_date: { type: String, required: true },
  event_time: { type: String, required: true },
  event_location: {
    venue_name: { type: String, required: true },
    neighborhood: { type: String, required: true },
    address: { type: String, required: true },
    longitude: { type: Number, required: true }, 
    latitude: { type: Number, required: true},  
  },
  event_tags: { type: [String],required: true },
  event_description: { type: String, required: true },
  ticket_link: { type: String,  },
  event_image: { type: String, },
  favEvent: {
    isFav: { type: Boolean, default: false }, 
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
