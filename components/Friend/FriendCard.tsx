import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { UserBody } from "../../typings";

interface Props {
  user: UserBody;
}

const FriendCard = ({ user }: Props) => {
  const {
    username,
    email,
    profileImg,
    skills,
    studyDegree,
    diplomes,
    yearsOfExp,
  } = user;
  return (
    <div className="flex items-center justify-around bg-white md:w-3/5 my-4 mx-auto py-4 w-10/12">
      <div className="flex items-center space-x-2">
        <img
          src={
            profileImg ||
            "https://marketplace.canva.com/EAFEits4-uw/1/0/800w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-r0bPCSjUqg0.jpg"
          }
          alt="profile-image"
          className="w-16 h-16 rounded-full"
        />
        <div className="info">
          <p className="text-sm lg:text-base font-bold">{username}</p>
          <p className="text-xs text-gray-500 font-semibold">
            ℗{username?.replace(/\s+/g, "").toLowerCase()}
          </p>
        </div>
      </div>
      <div className="add">
        <button className="flex items-center bg-mainColor text-white px-5 p-2">
          <AiOutlinePlus className="mr-2" />
          Add
        </button>
      </div>
    </div>
  );
};

export default FriendCard;
