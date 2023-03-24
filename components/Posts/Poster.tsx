import React, { useEffect, useState } from "react";
import { Comment, commentBody, Feeds } from "../../typings";
import TimeAgo from "react-timeago";
import {
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineHeart,
  AiTwotoneHeart,
  AiOutlineSend,
  AiOutlineLink,
} from "react-icons/ai";
import { BsFillPersonFill, BsSave } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { fetchComments } from "../../utils/fetchComments";
import ReactPlayer from "react-player/lazy";
import { GoLocation, GoPrimitiveDot } from "react-icons/go";
import Link from "next/link";
import { GiPriceTag } from "react-icons/gi";

interface Props {
  feed: Feeds;
}

const Poster = ({ feed }: Props) => {
  const {
    image,
    profileImg,
    title,
    username,
    _createdAt,
    _id,
    video,
    address,
    eventType,
    postType,
    eventLink,
    eventStartDate,
    eventEndDate,
    description,
    name,
    gigTags,
    gigType,
    category,
    subcategory,
    location,
    price,
    user,
  } = feed;
  const [videoUrl, setVideoUrl] = useState<string | null | undefined>("");
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const { data: session } = useSession();
  const [trancatedText, setTrancatedText] = useState(true);

  const handleTrancateText = () => {
    setTrancatedText(!trancatedText);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setVideoUrl(video);
  }, []);

  const errorCommentBox = () => {
    toast.error("Please, Login to add comment");
  };

  const postFeedComment = async () => {
    const feedCommentBody: commentBody = {
      comment: commentInput,
      username: session?.user?.name || "Unknown User",
      profileImage:
        session?.user?.image ||
        "https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=",
      feedId: _id,
    };
    const refreshToast = toast.loading("posting...");
    const result = await fetch(`/api/addComments`, {
      body: JSON.stringify(feedCommentBody),
      method: "POST",
    });
    const json = await result.json();
    const newComments = await fetchComments(_id);
    setComments?.(newComments);
    toast.success("Comment Added", {
      id: refreshToast,
    });
    return json;
  };

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postFeedComment();
    setCommentInput("");
  };

  const reloadComments = async () => {
    const comments: Comment[] = await fetchComments(_id);
    setComments(comments);
  };

  const truncate = (text: string, n: number) => {
    return text?.length > n ? text.substring(0, n - 1) + "..." : text;
  };

  useEffect(() => {
    reloadComments();
  }, []);

  return (
    <div className="post my-4 p-4 bg-white rounded-xl">
      <div className="box">
        <div className="post">
          <div className="post-user-info flex items-center justify-between mb-4 ">
            <div className="flex items-center w-full">
              <Link href={`/profile/${user?._ref}`}>
                <img
                  src={profileImg}
                  alt="avatar"
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
              </Link>
              <div className="ml-4 flex flex-col md:flex-row justify-between flex-1">
                <div className="">
                  <h3 className="line1 font-semibold text-base mb-1">
                    {username}
                  </h3>
                  <p className="text-xs not-italic font-normal text-[#595858] capitalize">
                    ℗{username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                </div>

                <div className="mt-2">
                  <p className="line2 text-gray-500 font-semibold text-xs">
                    <TimeAgo date={_createdAt} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="flex items-center mb-4">
              <p className="line4 text-sm  font-semibold">
                {postType === "gig" ? `Gig :  ${title}` : title}{" "}
              </p>
              {gigType && (
                <span className="flex items-center text-xs">
                  <GoPrimitiveDot className="text-gray-500" size={16} />{" "}
                  {gigType}{" "}
                </span>
              )}
            </div>

            {name && (
              <p className="text-sm mb-2 font-bold">
                Event : <span className="text-xs text-mainColor">{name}</span>
              </p>
            )}

            {eventType && (
              <p className="mb-2 text-gray-700 text-sm font-bold flex items-center">
                {eventType.toLowerCase() === "online" ? (
                  <GoPrimitiveDot className="text-green-500" size={24} />
                ) : (
                  <BsFillPersonFill />
                )}{" "}
                {eventType}
              </p>
            )}
            {description && (
              <div className="mb-2 text-gray-700">
                <span className="text-sm">
                  {trancatedText ? truncate(description, 150) : description}
                </span>
                <button
                  className="text-blue-600 cursor-pointer inline-block"
                  onClick={handleTrancateText}
                >
                  {trancatedText ? "show more" : "show less"}
                </button>
              </div>
            )}
            {category && (
              <span className="text-xs text-mainColor">{category} - </span>
            )}
            {subcategory && (
              <span className="text-xs text-mainColor">{subcategory}</span>
            )}
            {price && (
              <div className="text-sm my-2 flex items-center space-x-2 text-secondaryColor">
                <GiPriceTag />
                <p>${price}</p>
              </div>
            )}
            {location && (
              <div className="text-sm my-2 flex items-center space-x-2">
                <GoLocation size={16} />
                <p>{location}</p>
              </div>
            )}

            {gigTags && (
              <div className="flex items-center space-x-2 text-xs mb-2">
                {gigTags.map((tag) => (
                  <Link
                    href={"/"}
                    key={tag.id}
                    className="text-blue-700 font-bold hover:underline"
                  >
                    #{tag.text}
                  </Link>
                ))}
              </div>
            )}

            {postType === "event" && eventStartDate && eventEndDate && (
              <div>
                <p className="text-sm text-secondaryColor font-medium mb-4">
                  From : {eventStartDate}
                </p>
                <p className="text-sm text-secondaryColor font-medium mb-4">
                  To : {eventEndDate}
                </p>
              </div>
            )}

            {eventType?.toLowerCase() === "in person" && address && (
              <p className="flex items-center text-xs mb-1">
                <GoLocation className="mr-2" size={16} /> {address}
              </p>
            )}
            {eventLink && (
              <a
                href={eventLink}
                className="flex items-center space-x-2 text-xs mb-4 hover:text-mainColor transition-all duration-200 ease-in-out"
                target="_blank"
              >
                <AiOutlineLink className="mr-2" size={16} /> {eventLink}{" "}
              </a>
            )}
          </div>
          {image && (
            <img
              src={image}
              alt="poster image"
              className="rounded-xl shadow-sm w-full"
            />
          )}

          {videoUrl && <ReactPlayer url={videoUrl} width="100%" />}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-around">
        <div>
          {!isLiked ? (
            <AiOutlineHeart
              size={24}
              className="text-gray-500 cursor-pointer"
              onClick={toggleLike}
            />
          ) : (
            <AiTwotoneHeart
              size={24}
              className="text-red-600 cursor-pointer"
              onClick={toggleLike}
            />
          )}
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() =>
            session
              ? setCommentBoxVisible(!commentBoxVisible)
              : errorCommentBox()
          }
        >
          <AiOutlineComment size={24} className="text-gray-500 " />
          <p className="text-gray-500 ml-2"> {comments?.length} </p>
        </div>
        <div>
          <AiOutlineShareAlt
            size={24}
            className="text-gray-500 cursor-pointer"
          />
        </div>
        <div>
          <BsSave size={24} className="text-gray-500 cursor-pointer" />
        </div>
      </div>

      {commentBoxVisible && (
        <form
          className="mt-3 flex items-center space-x-3"
          onSubmit={handleSubmitComment}
        >
          <input
            type="text"
            placeholder="write a comment..."
            className="flex-1 rounded-lg bg-gray-200 p-2 pl-4 outline-none text-sm"
            value={commentInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCommentInput(e.target.value)
            }
          />
          <button
            className="text-mainColor disabled:text-gray-300"
            disabled={!commentInput}
            type="submit"
          >
            <AiOutlineSend size={24} />
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              {comments?.length >= 2 && (
                <hr className="absolute left-5 top-10 h-8 border-x border-mainColor/40" />
              )}
              <img
                src={comment.profileImage}
                alt={comment.username}
                className="mt-2 h-7 w-7 object-cover rounded-full"
              />
              <div className="w-full">
                <div className="flex items-center justify-between  ">
                  <div className="flex items-center space-x-1">
                    <p className="mr-1 font-bold text-sm">
                      {" "}
                      {comment.username}{" "}
                    </p>
                    <p className="hidden text-xs text-gray-500 lg:inline">
                      ℗{comment.username.replace(/\s+/g, "").toLowerCase()}
                    </p>
                  </div>

                  <TimeAgo
                    date={comment._createdAt}
                    className="text-xs text-gray-500"
                  />
                </div>
                <p> {comment.comment} </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Poster;
