const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Post } = require('../models/Post');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const postList = await Post.getAll();
      res.json(postList);
    } catch (e) {
      next(e);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const addNew = await Post.insert(req.body);
      res.json(addNew);
    } catch (e) {
      next(e);
    }
  });
