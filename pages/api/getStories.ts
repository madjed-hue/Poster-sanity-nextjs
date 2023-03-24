// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { Stories } from "../../typings";

const StoryQuery = groq`
  *[_type=="stories"]{
    _id,
    ...,
    user->{
      username,
      _id,
    }
  } | order(_createdAt desc)
`;

type Data = {
  allStories: Stories[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const allStories: Stories[] = await sanityClient.fetch(StoryQuery);
  res.status(200).json({ allStories });
}
