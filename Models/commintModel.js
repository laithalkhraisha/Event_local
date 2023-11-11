const pool = require('../db/db');

class CommintsModel {
  async getAllCommints(event_id) {
    const result = await pool.query('SELECT * FROM public.commints WHERE event_id=$1;',[event_id]);
    return result.rows;
  }



  async createCommint(commint, userId, eventId) {
    const result = await pool.query(
      'INSERT INTO public.commints (commint, user_id, event_id) VALUES ($1, $2, $3) RETURNING *;',
      [commint, userId, eventId]
    );
    return result.rows[0];
  }

  async updateCommint(commintId, commint, user_id, event_id) {
    const result = await pool.query(
      'UPDATE public.commints SET commint = $1, user_id = $2, event_id = $3 WHERE commint_id = $4 RETURNING *;',
      [commint, user_id, event_id, commintId]
    );
    return result.rows[0];
  }

  async deleteCommint(commintId) {
    const result = await pool.query('UPDATE public.commints SET "isDeleted" =true WHERE commint_id = $1 RETURNING *;', [commintId]);
    return result.rows[0];
  }
}

module.exports = new CommintsModel();
