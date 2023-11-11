const pool = require('../db/db');

class CategoryModel {
  async getAllCategories() {
    const result = await pool.query('SELECT * FROM public.category WHERE "isDeleted"=false ;');
    return result.rows;
  }

 

  async createCategory(name, brief) {
    const result = await pool.query(
      'INSERT INTO public.category (name, brief) VALUES ($1, $2) RETURNING *;',
      [name, brief]
    );
    return result.rows[0];
  }

  async updateCategory(categoryId, name, brief) {
    const result = await pool.query(
      'UPDATE public.category SET name = $1, brief = $2 WHERE id = $3 RETURNING *;',
      [name, brief, categoryId]
    );
    return result.rows[0];
  }

  async deleteCategory(categoryId) {
    const result = await pool.query('UPDATE public.category SET "isDeleted"=true WHERE id = $1 RETURNING *;', [categoryId]);
    return result.rows[0];
  }
}

module.exports = new CategoryModel();
