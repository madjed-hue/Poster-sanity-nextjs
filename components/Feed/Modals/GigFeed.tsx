import React, { useContext, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import MainSelect from "../MainSelect";
import { WithContext as ReactTags } from "react-tag-input";
import { FeedBody, Tag } from "../../../typings";
import { fetchFeeds } from "../../../utils/fetchFeeds";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { FeedContext } from "../Feed";
import { CloseIconContext, ContextUser } from "./MainModal";
import Image from "next/image";
import Link from "next/link";

const GigFeed = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [gigType, setGigType] = useState("");
  const gigTypeOptions = ["Remote", "In person"];
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  const { data: session } = useSession();
  const feeds = useContext(FeedContext);
  const setShow = useContext(CloseIconContext);
  const filtredUser = useContext(ContextUser);

  const progLang = ["ReactJS", "NodeJS", "NextJS", "Html", "CSS", "JavaScript"];
  const suggestions = progLang.map((lang) => {
    return {
      id: lang,
      text: lang,
    };
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const postImageFeed = async () => {
    const feedEventBody: FeedBody = {
      title: title,
      description: description,
      postType: "gig",
      username: session?.user?.name || "Unknown User",
      profileImg:
        session?.user?.image ||
        "https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=",
      image: selectedFile,
      gigTags: tags,
      gigType: gigType,
      location: location,
      price: price,
      category: category,
      subcategory: subCategory,
      userId: filtredUser,
    };
    const refreshToast = toast.loading("posting...");
    const result = await fetch(`/api/addImageFeed`, {
      body: JSON.stringify(feedEventBody),
      method: "POST",
    });
    const json = await result.json();

    const newFeeds = await fetchFeeds("getFeeds");
    feeds?.(newFeeds.allFeeds);
    toast.success("Feed Posted", {
      id: refreshToast,
    });
    return json;
  };

  const handlePost = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    postImageFeed();
    setSelectedFile("");
    setGigType("");
    setTitle("");
    setCategory("");
    setSubCategory("");
    setTags([]);
    setDescription("");
    setLocation("");
    setPrice(0);
    setShow(false);
  };

  const handleDelete = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  // @ts-ignore
  function handleAddition(tag: Tag) {
    if (tags.length <= 4) {
      setTags([...tags, tag]);
    } else {
      toast.error("Cannot add more than 5 items");
    }
  }

  const handleDrag = (tag: any, currPos: number, newPos: number) => {
    // @ts-ignore
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index: number) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <section>
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
        <form>
          <section>
            <div>
              <p className="font-normal text-xs text-[#8C8A8A] mb-3">
                Type of service
              </p>
              <MainSelect
                typeOfServiceOptions={gigTypeOptions}
                typeOfService={gigType}
                setTypeOfService={setGigType}
              />
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                Gig Title*
              </p>
              <input
                className="bg-[#F5F4F4] rounded-[15px] py-2 px-5 border-none w-full"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex justify-between mt-5">
              <div>
                <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                  Category*
                </p>
                <input
                  className="py-2 px-5 w-64 h-10 bg-[#f5f4f4] rounded-[15px] border-none"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                  Subcategory*
                </p>
                <input
                  className="py-2 px-5 w-64 h-10 bg-[#f5f4f4] rounded-[15px] border-none"
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                Search tags*
              </p>
              <ReactTags
                tags={tags}
                suggestions={suggestions}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="top"
                autocomplete
              />
              <p className="font-normal text-right text-[#8c8a8a] text-[10px] mt-1">
                Up to 5 terms
              </p>
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                Description*
              </p>
              <textarea
                className="py-2 px-5 w-full h-32 bg-[#f5f4f4] rounded-[15px] border-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols={30}
                rows={10}
                required
              />
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                Location*
              </p>
              <input
                className="bg-[#F5F4F4] rounded-[15px] py-2 px-5 border-none w-full"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">Price*</p>
              <input
                className="bg-[#F5F4F4] rounded-[15px] py-2 px-5 border-none w-full"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>

            <p className="font-normal text-xs text-[#8C8A8A] mt-5 mb-2">
              Gig gallery
            </p>
            {/* drag and drop */}
            <div className="max-w-xl">
              <input
                type="text"
                className="bg-[#F5F4F4] rounded-[15px] py-2 px-5 border-none w-full mb-2"
                onChange={(e) => setSelectedFile(e.target.value)}
                placeholder="Image Link.."
              />
              {selectedFile && (
                <img
                  src={selectedFile}
                  alt="preview"
                  className="w-full h-full rounded-[20px] object-cover"
                />
              )}
            </div>
          </section>

          {/* btn */}
          <section className="flex justify-end mt-4">
            <button
              type="button"
              className="px-8 py-1 text-[12px] font-semibold text-white bg-[#FF41A9] rounded-[15px] not-italic capitalize disabled:opacity-50"
              onClick={handlePost}
              disabled={!session}
            >
              Post
            </button>
          </section>
        </form>
      )}
    </section>
  );
};

export default GigFeed;
