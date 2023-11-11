const pool = require('../db/db');

class EventModel {
  async getAllEvents() {
    const result = await pool.query('SELECT * FROM public."Events" WHERE "isDeleted"=false;');
    return result.rows;
  }

  async getEventById(eventId) {
    const result = await pool.query('SELECT * FROM public."Events" WHERE event_id = $1 and isDeleted=false;', [eventId]);
    return result.rows[0];
  }

  async createEvent(event_name, speaker, location, date, tickets, price, category_id, image_url) {
    const result = await pool.query(
      'INSERT INTO public."Events" (event_name, location, date, tickets,price, category_id, speaker, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
      [event_name, location, date, tickets, price, category_id, speaker, image_url]
    );
    return result.rows[0];
  }
  

  async updateEvent(event_name,location,date,tickets,price,image_url,category_id,speaker,event_Id)  {
    const result = await pool.query(
      'UPDATE public."Events" SET event_name = $1,  location = $2, date = $3, tickets = $4, price = $5, image_url = $6, category_id = $7,speaker = $8  WHERE event_id = $9 RETURNING *;',
      [event_name,location,date,tickets,price,image_url,category_id,speaker,event_Id]
    );
    return result.rows[0];
  }

  async deleteEvent(eventId) {
    const result = await pool.query('UPDATE public."Events" SET "isDeleted"=true  WHERE event_id = $1 RETURNING *;', [eventId]);
    return result.rows[0];
  }
}

module.exports = new EventModel();
