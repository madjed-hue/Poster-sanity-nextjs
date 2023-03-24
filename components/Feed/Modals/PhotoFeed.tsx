import { signIn, useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import { FeedBody } from "../../../typings";
import { fetchFeeds } from "../../../utils/fetchFeeds";
import { FeedContext } from "../Feed";
import toast from "react-hot-toast";
import { CloseIconContext, ContextUser } from "./MainModal";
import Link from "next/link";

const PhotoFeed = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [myInput, setMyInput] = useState<string>("");
  const [myText, setMyText] = useState<string>("");
  const { data: session } = useSession();
  const feeds = useContext(FeedContext);
  const setShow = useContext(CloseIconContext);
  const filtredUser = useContext(ContextUser);

  const postImageFeed = async () => {
    const feedImageBody: FeedBody = {
      title: myInput,
      description: myText,
      postType: "ImagePost",
      username: session?.user?.name || "Unknown User",
      profileImg:
        session?.user?.image ||
        "https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=",
      image: selectedFile,
      userId: filtredUser,
    };
    const refreshToast = toast.loading("posting...");
    const result = await fetch(`/api/addImageFeed`, {
      body: JSON.stringify(feedImageBody),
      method: "POST",
    });

    const json = await result.json();
    const newFeeds = await fetchFeeds("getFeeds");
    feeds?.(newFeeds.allFeeds);
    toast.success("Feeds Posted !.", {
      id: refreshToast,
    });
    return json;
  };

  const handlePost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postImageFeed();
    setSelectedFile("");
    setMyInput("");
    setMyText("");
    setShow(false);
  };

  return (
    <section className="dropdowncss">
      {!filtredUser ? (
        <div className="flex items-center space-x-1">
          <p className="text-center">
            Please Complete Your profile to start Posting.
          </p>
          {session ? (
            <Link
              href={`/profile/${session?.user?.email}`}
              className="text-blue-700 underline"
            >
              Complete Now
            </Link>
          ) : (
            <button
              onClick={() => signIn()}
              className="text-blue-700 underline"
            >
              Sign In
            </button>
          )}
        </div>
      ) : (
        <div>
          <div>
            <input
              type="text"
              placeholder="Title..."
              className="mt-0 w-full outline-none border px-4 py-2 mb-2"
              onChange={(e) => setMyInput(e.target.value)}
              value={myInput}
            />
            <textarea
              className="w-full mb-1 mt-0 rounded-lg outline-none border px-4 py-2"
              placeholder="Description..."
              rows={2}
              onChange={(e) => setMyText(e.target.value)}
              value={myText}
            ></textarea>
            <input
              type="text"
              className="mt-0 w-full outline-none border px-4 py-2 mb-2"
              onChange={(e) => setSelectedFile(e.target.value)}
              placeholder="Image Link.."
            />
            <div className="max-w-xl">
              {selectedFile && (
                <img
                  src={selectedFile}
                  alt="preview"
                  className="w-full h-full rounded-[20px] object-cover"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="px-8 py-1 text-[12px] font-semibold text-white bg-[#FF41A9] rounded-full not-italic capitalize disabled:opacity-60"
              onClick={handlePost}
              disabled={!filtredUser}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoFeed;
