import { Post } from "../db/models";

export async function index() {
  const posts = Post.findAll({
    order: [["id", "DESC"]],
  });
  return posts;
}

export async function create({ title, description }) {
  const post = await Post.create({
    title: title,
    description: description,
  });

  return post.dataValues;
}

export async function edit(id) {
  const post = await Post.findOne({
    where: {
      id: id,
    },
  });

  return post;
}

export async function update({ title, description }, id) {}
