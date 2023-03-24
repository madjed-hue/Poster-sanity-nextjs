import axios from "axios";

export const fetchUsers = async () => {
  const req = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getUsers`
  );
  return req.data;
};
