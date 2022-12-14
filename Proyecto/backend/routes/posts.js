const express = require("express");
const { route } = require("../app");
const Post = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    pares: req.body.pares,
    process: req.body.process,
    style: req.body.style,
    corrida: req.body.corrida
  });
  post.save().then((createPost) => {
    res.status(201).json({
      message: "Post added seccesful",
      postId: createPost._id,
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: "Publicaciones expuestas con Exito",
      posts: documents,
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result),
      res.status(200).json({
        message: "Publicacion eliminada",
      });
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    pares: req.body.pares,
    process: req.body.process,
    style: req.body.style,
    corrida: req.body.corrida
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post Updated Succesfully" });
  });
});

router.get("/:id", (res, req, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "No se encuentro el post" });
    }
  });
});

module.exports = router;
