import { Post } from "../../../../db/models";
export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const { method } = req;
    switch (method) {
      case "GET": {
        const post = await Post.findOne({
          where: {
            id: id,
          },
        });
        res.status(200).json(post);
        break;
      }

      case "DELETE": {
        await Post.destroy({
          where: {
            id: id,
          },
        });
        res
          .status(200)
          .json({ status: "success", message: "post is deleted successfully" });
        break;
      }

      case "PUT": {
        const request = req.body;
        await Post.update(
          {
            title: request.title,
            description: request.description,
          },
          {
            where: {
              id: id,
            },
          }
        );

        return res.status(200).json({ status: "successost" });

        break;
      }
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
    });
  }
}
