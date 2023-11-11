
const pool = require('../db/db');



class User {
  async createUser (user_name, email, password) {
    try {
      const result = await pool.query(
        'INSERT INTO public."Users"(user_name, email, password)VALUES ($1, $2, $3)RETURNING *',[user_name, email, password]
      );

      
      return result.rows[0];
      
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers () {
    try {
      const result = await pool.query(
        'select * from public."Users"  WHERE "isDeleted"=false	'
      );

      
      return result.rows;
      
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(user_id) {
    try {
      const result = await pool.query(
        'UPDATE public."Users" SET "isDeleted"=true WHERE user_id=$1 RETURNING *;',
        [user_id]
      );
  
      
      if (result.rows.length === 0) {
        return null; 
      }
  
      
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  

  async loginUser (email) {
    try {
      const result = await pool.query(
        'select * from public."Users" WHERE email=$1',[email]
      );

      
      return result.rows[0];
      
    } catch (error) {
      throw error;
    }
  }
  
  async updateUser(user_id, user_name, email, password) {
    try {
      const result = await pool.query(
        'UPDATE public."Users" SET user_name=$2, email=$3, password=$4 WHERE user_id=$1 RETURNING *;',
        [user_id, user_name, email, password]
      );
  
      
      if (result.rows.length === 0) {
        return null; 
      }
  
      // Return the updated user data
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  
  
}
 

module.exports = new User();
