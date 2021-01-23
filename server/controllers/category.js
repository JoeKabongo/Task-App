import Category from '../models/category.js';
import Profile from '../models/profile.js';
export async function createCategory(req, res) {
  const { name } = req.body;
  try {
    const newCategory = new Category({ name, userId: req.user.userId });
    const user = await Profile.findById(req.user.userId);
    const result = await newCategory.save();
    user.categoryList.push(result.id);
    await user.save();
    return res.status(200).json(result);
  } catch (error) {
    console.log('there');
    return res.status(500).json(error);
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await Category.find({ userId: req.user.userId });
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
}
