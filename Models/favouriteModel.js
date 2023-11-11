const pool = require('../db/db');

class FavouriteModel {
  async getAllFavourites(user_id) {
    const result = await pool.query('SELECT  public.favourite.id , public."Events".event_id,public."Events".event_name,public."Events".location,public."Events".date,public."Events".price,public."Events".image_url FROM public.favourite JOIN public."Events" ON public."Events".event_id = public.favourite.event_id where user_id =$1;',[user_id]);
    return result.rows;
  }

  

  async createFavourite(user_id, event_id) {
    const result = await pool.query(
      'INSERT INTO public.favourite (user_id, event_id) VALUES ($1, $2) RETURNING *;',
      [user_id, event_id]
    );
    return result.rows[0];
  }

 

  async deleteFavourite(favouriteId) {
    const result = await pool.query('DELETE FROM public.favourite WHERE id = $1 RETURNING *;', [favouriteId]);
    return result.rows[0];
  }
}

module.exports = new FavouriteModel();
