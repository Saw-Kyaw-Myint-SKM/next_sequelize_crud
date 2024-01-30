import { NextApiRequest, NextApiResponse } from "next";
import { index, create } from "../../../../service/postService";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "The title field is required" }),
  description: z
    .string()
    .min(1, { message: "The Description field is required" }),
    // .length(10),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    // Get Methos
    case "GET": {
      const posts = await index();
      res.status(200).json(posts);
      break;
    }

    case "POST": {
      const validation: any = schema.safeParse(req.body);

      if (!validation.success) {
        return res.status(400).json(validation.error.format());
      }

      await create(req.body);
      res.status(200).json({ message: "success" });
      break;
    }
  }
};

export default handler;
