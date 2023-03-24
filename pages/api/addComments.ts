// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { commentBody } from "../../typings";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const comment: commentBody = JSON.parse(req.body);
  const mutations = {
    mutations: [
      {
        create: {
          _type: "comment",
          comment: comment.comment,
          profileImage: comment.profileImage,
          username: comment.username,
          poster: {
            _type: "reference",
            _ref: comment.feedId,
          },
        },
      },
    ],
  };
  const apiEndoiont = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
  const result = await fetch(apiEndoiont, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_APP_SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: "POST",
  });
  const json = await result.json();
  res.status(200).json({ name: "John Doe" });
}
