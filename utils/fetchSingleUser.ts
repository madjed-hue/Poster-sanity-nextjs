import axios from "axios";

export const fetchSingleUser = async (id: string | string[] | undefined) => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSingleUser?id=${id}`
  );
  return req.data;
};
