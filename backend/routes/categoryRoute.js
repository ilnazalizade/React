import express from 'express';
import Category from '../models/categoryModel';
import { isAdmin, isAuth } from '../util';



const router = express.Router();



router.post('/add', isAuth, isAdmin, async (req, res) => {
  const { name } = req.body;

  if (name) {
    const category = new Category({ name });
    const newCategory = await category.save();
    if (newCategory) {
      res.send({
        list: newCategory,
      });
    }
  }else{
    res.status(400).send({ message: 'all field is required' });
  }
});

router.get("/", async (req, res) => {
  const categories = await Category.find({})
  res.send(categories);
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedCategory = await Category.findById(req.params.id);
  if (deletedCategory) {
    await deletedCategory.remove();
    res.send({ message: 'category deleted!' });
  } else {
    res.send('Error in Deletion.');
  }
});

export default router;
