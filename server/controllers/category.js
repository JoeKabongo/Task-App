import Category from '../models/category.js';
import Profile from '../models/profile.js';
import Task from '../models/task.js';

export async function createCategory(req, res) {
  const { name } = req.body;
  // make sure request is valid
  if (!name) {
    return res.status(400).json({
      error: 'bad request',
      message: 'category name missing in request',
    });
  }
  try {
    const category = await Category.findOne({ name, userId: req.user._id });
    // if the user already have a category with this name
    if (category) {
      return res.status(409).json({
        error: 'Duplicate content',
        message: 'Category with that name already exist',
      });
    }
    // create new category and add it to the category list of the user
    const newCategory = new Category({ name, userId: req.user.userId });
    const user = await Profile.findById(req.user.userId);
    const result = await newCategory.save();
    user.categoryList.push(result.id);
    await user.save();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong in the server',
    });
  }
}

// get all category for a user
export async function getCategories(req, res) {
  try {
    const categories = await Category.find({ userId: req.user.userId });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong in the server',
    });
  }
}

// delete a user's category
export async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    // delete the catetory and the tasks associated with it
    const category = await Category.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    // verify that this category existed
    if (!category) {
      return res.status(404).json({
        error: 'not found error',
        message: 'This category was not found in our server',
      });
    }
    await Task.deleteMany({ category: id });
    return res.status(200).json({ message: 'Category was deleted' });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong on the server',
    });
  }
}
