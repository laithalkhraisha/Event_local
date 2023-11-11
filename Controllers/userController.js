const User = require('../Models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

class UserController {
  async createUser(req, res) {
    try {
      const { user_name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.createUser(user_name, email, hashedPassword);

      const secretKey = 'dear mester hokobl';
      const token = jwt.sign({ userId: newUser.user_id, email: newUser.email }, secretKey, {
        expiresIn: '1h',
      });

      res.status(200).json({ user_id: newUser.user_id, token });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateUser(req, res) {
    try {
      const user_Id = req.query.id;
      const { user_name, email, password } = req.body;
      let hashedPassword;
  
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
  
      const user = await User.updateUser(user_Id, user_name, email, hashedPassword);
  
      if (user===null) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  

  async deleteUser(req, res) {
    try {
      const user_id = req.query.id;

      const user = await User.deleteUser(user_id);

      if (user===null) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error soft deleting user:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await User.loginUser(email);
 
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const storedHashedPassword = user.password;
  
      const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const secretKey = 'dear mester hokobl';
      const token = jwt.sign({ userId: user.user_id, email: user.email }, secretKey, {
        expiresIn: '1h',
      });
  
      res.json({ token, user_id: user.user_id, ruleid: user.rule_id });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  
  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error getting all users:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new UserController();
