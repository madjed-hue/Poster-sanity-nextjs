import axios from "axios";

export const fetchComments = async (feedId: string) => {
  const req = await axios.get(`/api/getComments?feedId=${feedId}`);
  return req.data;
};
