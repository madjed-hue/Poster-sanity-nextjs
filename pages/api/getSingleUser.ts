// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";
import { User } from "../../typings";

const UserQuery = groq`
  *[_type=="user" && _id == $id ]{
    _id,
    ...
  } 
`;

type Data = {
  user: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  const user: User = await sanityClient.fetch(UserQuery, { id });

  res.status(200).json({ user });
}
