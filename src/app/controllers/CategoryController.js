const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({
      name,
    });

    return response.status(201).json(category);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    return response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const category = await CategoriesRepository.findById(id);

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await CategoriesRepository.update(id, {
      name,
    });

    return response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    const contact = await CategoriesRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Categorie not found' });
    }

    await CategoriesRepository.delete(id);
    // 204 - No content
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
