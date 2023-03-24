import { signIn, useSession } from "next-auth/react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CloseIconContext, ContextUser } from "./MainModal";
import Link from "next/link";
import MainSelect from "../MainSelect";
import { StoryBody } from "../../../typings";
import ReactPlayer from "react-player";
import { BsFillTrashFill } from "react-icons/bs";
import { AllStoriesContext } from "../../../pages";
import { fetchStories } from "../../../utils/fetchStories";

const StoryFeed = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [storyType, setStoryType] = useState("");
  const storyTypeOptions = ["image", "video"];
  const { data: session } = useSession();
  const setShow = useContext(CloseIconContext);
  const filtredUser = useContext(ContextUser);
  const allstoriesValue = useContext(AllStoriesContext);

  const postStoryFeed = async () => {
    const feedStoryBody: StoryBody = {
      title: title,
      description: description,
      storyType: storyType,
      duration: 5000,
      seeMore: description ? true : false,
      url: selectedFile,
      userId: filtredUser,
    };
    const refreshToast = toast.loading("posting...");
    const result = await fetch(`/api/addStory`, {
      body: JSON.stringify(feedStoryBody),
      method: "POST",
    });
    const json = await result.json();
    const newStories = await fetchStories();
    allstoriesValue?.setAllStories(newStories.allStories);
    toast.success("Story Added !.", {
      id: refreshToast,
    });
    return json;
  };

  const handlePost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postStoryFeed();
    setSelectedFile("");
    setTitle("");
    setDescription("");
    setShow(false);
  };
  return (
    <section className="dropdowncss">
      {!filtredUser ? (
        <div className="flex items-center space-x-1">
          <p className="text-center">
            Please Complete Your profile to add Stories.
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
            <div>
              <p className="font-normal text-xs text-[#8C8A8A] mb-3">
                Type of Story
              </p>
              <MainSelect
                typeOfServiceOptions={storyTypeOptions}
                typeOfService={storyType}
                setTypeOfService={setStoryType}
              />
            </div>
            <input
              type="text"
              placeholder="Title..."
              className="mt-2 w-full outline-none border px-4 py-2 mb-2"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              className="w-full mb-1 mt-0 rounded-lg outline-none border px-4 py-2"
              placeholder="Description..."
              rows={2}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
            {storyType === "image" && (
              <>
                <input
                  type="text"
                  className="mt-0 w-full outline-none border px-4 py-2 mb-2"
                  onChange={(e) => setSelectedFile(e.target.value)}
                  placeholder="image link.."
                />
                <div className="max-w-xl relative">
                  {selectedFile && (
                    <>
                      <img
                        src={selectedFile}
                        alt="preview"
                        className="w-full h-full rounded-[20px] object-cover"
                      />
                      <BsFillTrashFill
                        className="absolute text-red-500 bottom-2 right-2 cursor-pointer bg-white p-2 rounded-full"
                        size={36}
                        onClick={() => setSelectedFile("")}
                      />
                    </>
                  )}
                </div>
              </>
            )}

            {storyType === "video" && (
              <>
                <input
                  type="text"
                  className="mt-0 w-full outline-none border px-4 py-2 mb-2"
                  placeholder="video url"
                  onChange={(e) => setSelectedFile(e.target.value)}
                />
                {selectedFile && (
                  <div className="w-full relative">
                    <ReactPlayer url={selectedFile} width="100%" />
                    <BsFillTrashFill
                      className="absolute text-red-500 bottom-2 right-2 cursor-pointer bg-white p-2 rounded-full"
                      size={36}
                      onClick={() => setSelectedFile("")}
                    />
                  </div>
                )}
              </>
            )}
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

export default StoryFeed;
