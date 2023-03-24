import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import FriendCard from "../components/Friend/FriendCard";
import Layout from "../components/Layout/Layout";
import { User } from "../typings";
import { fetchUsers } from "../utils/fetchUsers";

interface Props {
  allUser: User[];
}

const Friend = ({ allUser }: Props) => {
  const { data: session } = useSession();
  const filterdUsers = allUser.filter(
    (user) => user.email !== session?.user?.email
  );

  const targetUpdateUser = allUser.find(
    (user) => user.email === session?.user?.email
  );

  return (
    <Layout>
      {filterdUsers.map((user) => (
        <FriendCard key={user._id} user={user} />
      ))}
    </Layout>
  );
};

export default Friend;

export const getServerSideProps: GetServerSideProps = async () => {
  const { allUser } = await fetchUsers();

  return {
    props: {
      allUser,
    },
  };
};
