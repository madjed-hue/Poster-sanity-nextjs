// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { Feeds } from "../../typings";

const FeedQuery = groq`
  *[_type=="poster" && !blockImagePoster]{
    _id,
    ...
  } | order(_createdAt desc)
`;

type Data = {
  allFeeds: Feeds[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const allFeeds: Feeds[] = await sanityClient.fetch(FeedQuery);
  res.status(200).json({ allFeeds });
}
