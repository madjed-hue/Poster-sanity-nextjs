// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { FeedBody, StoryBody } from "../../typings";

type Data = {
  message: string;
};

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: StoryBody = JSON.parse(req.body);
  const mutations = {
    mutations: [
      {
        create: {
          _type: "stories",
          title: data.title,
          duration: data.duration,
          url: data.url,
          storyType: data.storyType,
          description: data.description,
          seeMore: data.seeMore,
          user: {
            _type: "reference",
            _ref: data.userId,
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
  res.status(200).json({ message: "Added !" });
}
