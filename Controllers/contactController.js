const ContactUsModel = require('../Models/contactModel');

class ContactUsController {
  async getAllContacts(req, res) {
    try {
      const contacts = await ContactUsModel.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  

  async createContact(req, res) {
    const { name, email, message } = req.body;
    try {
      const newContact = await ContactUsModel.createContact(name, email, message);
      res.status(201).json(newContact);
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  

  
}

module.exports = new ContactUsController();
