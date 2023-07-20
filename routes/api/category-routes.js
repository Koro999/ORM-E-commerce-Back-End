const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories along with its associated Products
    const categoryData = await Category.findAll({
      //include the products tied to the category, using include and specifying the model
      include: [
        {
          model: Product
        }
      ],
    });
    //return 200 status and json object 
    res.status(200).json(categoryData);
  } catch (err) {
    //if error send 500 and err 
    res.status(500).json(err);
  } 
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value and its associated Products 
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
    ],
    });
    //if there is no matching id send this message 
    if (!categoryData) {
      res.status(404).json(
        { 
          message: 'No category found with matching id.' 
        }
      );
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    //grab all information from the db
    const categoryData = await Category.update(req.body, 
      {
        //specify where in the db to update the category
        where: {
          id: req.params.id,
        }
      });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category found with matching id.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
        where: { id: req.params.id, }
      });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with matching id.' });
      return;
    }
    res.status(200).json('Category deleted.');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
