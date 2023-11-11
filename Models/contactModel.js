const pool = require('../db/db');

class ContactUsModel {
  async getAllContacts() {
    const result = await pool.query('SELECT * FROM public."Contact_us";');
    return result.rows;
  }

  

  async createContact(name, email, message) {
    const result = await pool.query(
      'INSERT INTO public."Contact_us" (name, email, "message") VALUES ($1, $2, $3) RETURNING *;',
      [name, email, message]
    );
    return result.rows[0];
  }

 
}

module.exports = new ContactUsModel();
