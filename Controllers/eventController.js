const EventModel = require('../Models/eventModel');

class EventController {
  async getAllEvents(req, res) {
    try {
      const events = await EventModel.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getEventById(req, res) {
    const eventId = req.params.id;
    try {
      const event = await EventModel.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error('Error fetching event:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async createEvent(req, res) {
    
  
    try {
      const { event_name, speaker, location, date, tickets, price, category_id } = req.body;
      const image_url = req.file.filename;
    
  
      const newEvent = await EventModel.createEvent(event_name, speaker, location, date, tickets, price, category_id, image_url);
  
      res.status(201).json(newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateEvent(req, res) {
    const event_Id = req.query.id;
    const { event_name, speaker, location, date, tickets, price, category_id } = req.body;
    const image_url = req.file.filename;
    try {
      const updatedEvent = await EventModel.updateEvent(event_name,location,date,tickets,price,image_url,category_id,speaker,event_Id);
      res.json(updatedEvent);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteEvent(req, res) {
    const event_Id = req.query.id;
    try {
      const deletedEvent = await EventModel.deleteEvent(event_Id);
      if (!deletedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new EventController();
