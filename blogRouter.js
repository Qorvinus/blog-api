'use strict';

const express = require('express');

const router = express.Router();

const {BlogPosts} = require('./models');

BlogPosts.create(
  'Title 1', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'J.R.R. Tolken'
);

BlogPosts.create(
  'Title 2', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'J.K. Rowling'
);

router.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
  console.log('you\'re doing GET');
});

router.post('/blog-posts', (req, res) => {
  const requiredFields = ['title', 'content', 'author'];
  for(let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing ${field} in the request body!`;
      console.error(message);
      return res.status(400).send(message);
    };
  };
  const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(post);
});

router.delete('/blog-posts/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post ${req.params.id}.`);
  res.status(204).end();
});

router.put('/blog-posts/:id', (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author'];
  for(let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing ${field} in the request body!`;
      console.error(message);
      return res.status(400).send(message);
    };
  };

  //change params to body
  if(req.body.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`);
      console.error(message);
      return res.status(400).send(message);
    };
    console.log(`Updating blog post ${req.body.id}`);
    const updatedPost = BlogPosts.update({
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
  res.status(204).end();
});

module.exports = router;
