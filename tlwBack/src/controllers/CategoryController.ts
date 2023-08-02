import { Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import * as CategoryServices from '../services/CategoryServices';

export const createCategory = async (req: Request, res: Response) => {
  // Verifique os erros
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }

  const { name } = req.body;
  try {
    const category = await CategoryServices.createCategory({name},req);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao criar a categoria' });
  }
};


/* const createTeste = async (req: Request, res: Response) => {
  // Verifique os erros
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }

  const { name } = req.body;
  try {
    const category = await CategoryServices.createCategory({name},req);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao criar a categoria' });
  }
}; */

export const getCategory = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const category = await CategoryServices.findCategoryBySlug(slug);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

/* const teste = async (req: Request, res: Response) => {
  const { slug } = req.params;
    test 02
  try {
    const category = await CategoryServices.findCategoryBySlug(slug);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}; */

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Verify Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }

  const data = matchedData(req);

  try {
    const category = await CategoryServices.updateCategory(id, data);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};
/*export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Verify Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.mapped() });
    return;
  }

  const data = matchedData(req);

  try {
    const category = await CategoryServices.updateCategory(id, data);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
}; */

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await CategoryServices.deleteCategory(id);
    if (category) {
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryServices.findAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
