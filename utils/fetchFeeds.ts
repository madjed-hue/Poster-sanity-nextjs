import axios from "axios";

export const fetchFeeds = async (endpoints: string) => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${endpoints}`
  );
  return req.data;
};
