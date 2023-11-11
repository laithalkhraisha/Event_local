const CommintsModel = require('../models/commintModel');

class CommintsController {
  async getAllCommints(req, res) {
    const {event_id}=req.body

    try {
      const commints = await CommintsModel.getAllCommints(event_id);
      res.json(commints);
    } catch (error) {
      console.error('Error fetching commints:', error);
      res.status(500).send('Internal Server Error');
    }
  }


  async createCommint(req, res) {
    const { commint, user_id, event_id } = req.body;
    try {
      const newCommint = await CommintsModel.createCommint(commint, user_id, event_id);
      res.status(201).json(newCommint);
    } catch (error) {
      console.error('Error creating commint:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateCommint(req, res) {
    const commintId = req.query.id;
    const { commint, user_id, event_id } = req.body;
    try {
      const updatedCommint = await CommintsModel.updateCommint(commintId, commint, user_id, event_id);
      res.json(updatedCommint);
    } catch (error) {
      console.error('Error updating commint:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteCommint(req, res) {
    const commintId = req.query.id;
    try {
      const deletedCommint = await CommintsModel.deleteCommint(commintId);
      if (!deletedCommint) {
        return res.status(404).json({ error: 'Commint not found' });
      }
      res.json({ message: 'Commint deleted successfully' });
    } catch (error) {
      console.error('Error deleting commint:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new CommintsController();
