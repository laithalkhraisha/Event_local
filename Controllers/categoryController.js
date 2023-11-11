const CategoryModel = require('../Models/categoryModel');

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await CategoryModel.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  

  async createCategory(req, res) {
    const { name, brief } = req.body;
    try {
      const newCategory = await CategoryModel.createCategory(name, brief);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateCategory(req, res) {
    const categoryId = req.query.id;
    const { name, brief } = req.body;
    try {
      const updatedCategory = await CategoryModel.updateCategory(categoryId, name, brief);
      res.json(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteCategory(req, res) {
    const categoryId = req.query.id;
    try {
      const deletedCategory = await CategoryModel.deleteCategory(categoryId);
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new CategoryController();
