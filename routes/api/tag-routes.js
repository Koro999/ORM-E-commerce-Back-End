const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ],
    });
    //return 200 status and json object 
    res.status(200).json(tagData);
  } catch (err) {
    //if error send 500 and err 
    res.status(500).json(err);
  } 
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ],
    });
    if (!categoryData) {
      res.status(404).json(
        { 
          message: 'No tag found with matching id.' 
        }
      );
      return;
    }
    //return 200 status and json object 
    res.status(200).json(tagData);
  } catch (err) {
    //if error send 500 and err 
    res.status(500).json(err);
  } 
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    //return 200 status and json object 
    res.status(200).json(tagData);
  } catch (err) {
    //if error send 500 and err 
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.params.id, {
      where: {
        id: req.params.id,
      }
    });

    if (!categoryData) {
      res.status(404).json(
        { 
          message: 'No tag found with matching id.' 
        }
      );
      return;
    }
    //return 200 status and json object 
    res.status(200).json(tagData);
  } catch (err) {
    //if error send 500 and err 
    res.status(500).json(err);
  } 
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy(req.params.id, {
      where: {
        id: req.params.id,
      }
    });

    if (!categoryData) {
      res.status(404).json({ 
          message: 'No tag found with matching id.' 
      });
      return;
    }
    //return 200 status and json object 
    res.status(200).json('Tag deleted.');
  } catch (err) {
    //if error send 500 and err 
    res.status(500).json(err);
  } 
});

module.exports = router;
