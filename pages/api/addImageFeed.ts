// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "../../sanity";
import { FeedBody } from "../../typings";

type Data = {
  message: string;
};

export const config = { api: { bodyParser: { sizeLimit: "4mb" } } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: FeedBody = JSON.parse(req.body);
  const mutations = {
    mutations: [
      {
        create: {
          _type: "poster",
          title: data.title,
          postType: data.postType,
          description: data.description,
          username: data.username,
          blockImagePoster: false,
          profileImg: data.profileImg,
          image: data.image,
          video: data.video,
          eventType: data.eventType,
          name: data.name,
          address: data.address,
          eventLink: data.eventLink,
          eventEndDate: data.eventEndDate,
          eventStartDate: data.eventStartDate,
          gigTags: data.gigTags,
          gigType: data.gigType,
          location: data.location,
          price: data.price,
          category: data.category,
          subcategory: data.subcategory,
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
