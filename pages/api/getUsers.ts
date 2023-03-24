// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { User } from "../../typings";

const UserQuery = groq`
  *[_type=="user"]{
    _id,
    ...
  } | order(_createdAt desc)
`;

type Data = {
  allUser: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const allUser: User[] = await sanityClient.fetch(UserQuery);
  res.status(200).json({ allUser });
}
