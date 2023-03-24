import axios from "axios";

export const fetchStories = async () => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getStories`
  );
  return req.data;
};
