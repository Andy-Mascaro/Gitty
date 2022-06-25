const { Router } = require('express');
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

  .post('/', async (req, res, next) => {
    try {
      const addNew = await Post.insert();
      res.json(addNew);
    } catch (e) {
      next(e);
    }
  });
