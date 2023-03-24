import React, { useEffect, useState } from "react";
import Image from "next/image";
import ProfileImg from "../../assets/1.jpg";
import TagIcon from "../../assets/icon.svg";
import { useSession } from "next-auth/react";
import { fetchUsers } from "../../utils/fetchUsers";
import { User } from "../../typings";

const Sidebar = () => {
  const { data: session } = useSession();
  const [allUsers, setAllUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();
      setAllUsers(users.allUser);
    };
    getUsers();
  }, []);
  const filtredUser = allUsers?.filter(
    (user) => user.email === session?.user?.email
  );

  return (
    <div className="bg-white p-5 flex flex-col justify-center items-center rounded-xl">
      <div className="w-full">
        <div className="flex flex-col justify-center items-center border-b-2 pb-4">
          <Image
            src={session?.user?.image || ProfileImg}
            alt="avatar"
            width={55}
            height={55}
            className="rounded-full mb-3"
          />
          <h2 className="text-lg text-slate-700 mb-2">
            {session?.user?.name || "User Name"}{" "}
          </h2>
          <p className="text-sm mb-2">{session?.user?.email || "User Info"}</p>
          {filtredUser && (
            <div className="flex justify-between items-center flex-wrap">
              {filtredUser[0]?.skills?.map((skill) => (
                <button
                  className="rounded-full px-2 py-1 hover:text-btnHoverColor transition-all duration-200 text-sm hover:bg-gray-50"
                  key={skill.id}
                >
                  {skill?.text}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-2">
          {filtredUser && filtredUser[0]?.yearsOfExp && (
            <h3 className="">
              Experience :
              <span className="text-btnHoverColor">
                {filtredUser[0]?.yearsOfExp} years
              </span>
            </h3>
          )}
          <p className="text-xs text-gray-600 mb-2">Expand network</p>
          <div className="flex content-center">
            <Image src={TagIcon} alt="tag icon" />
            {filtredUser && filtredUser[0]?.studyDegree && (
              <p className="text-btnHoverColor ml-2 text-sm">
                {filtredUser[0]?.studyDegree}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
