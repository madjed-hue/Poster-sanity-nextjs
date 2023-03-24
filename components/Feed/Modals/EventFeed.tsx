import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { BsFillCalendarDateFill } from "react-icons/bs";
import MainSelect from "../MainSelect";
import { DateRangePicker } from "react-date-range";
import { fetchFeeds } from "../../../utils/fetchFeeds";
import { toast } from "react-hot-toast";
import { FeedBody } from "../../../typings";
import { signIn, useSession } from "next-auth/react";
import { FeedContext } from "../Feed";
import { CloseIconContext, ContextUser } from "./MainModal";
import { config } from "../../../pages/api/config";
import Image from "next/image";
import Link from "next/link";

const EventFeed = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [eventType, setEventType] = useState("");
  const typeOfServiceOptions = ["Online", "In person"];

  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [eventAddress, setEventAddress] = useState<string>("");

  const { data: session } = useSession();
  const feeds = useContext(FeedContext);
  const setShow = useContext(CloseIconContext);
  const filtredUser = useContext(ContextUser);

  const handleChange = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRanges = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const postImageFeed = async () => {
    const feedEventBody: FeedBody = {
      description: description,
      postType: "event",
      username: session?.user?.name || "Unknown User",
      profileImg:
        session?.user?.image ||
        "https://media.istockphoto.com/id/1397556857/vector/avatar-13.jpg?s=612x612&w=0&k=20&c=n4kOY_OEVVIMkiCNOnFbCxM0yQBiKVea-ylQG62JErI=",
      image: selectedFile,
      eventType: eventType,
      name: eventName,
      address: eventAddress,
      eventLink: link,
      eventEndDate: dayjs(endDate).format("YYYY-MM-DD"),
      eventStartDate: dayjs(startDate).format("YYYY-MM-DD"),
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

  const handlePost = (e: any) => {
    e.preventDefault();
    postImageFeed();
    setSelectedFile("");
    setSelectedFile("");
    setEventType("");
    setStartDate(new Date());
    setEndDate(new Date());
    setDescription("");
    setEventName("");
    setEventAddress("");
    setShow(false);
  };

  return (
    <section className="">
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
        <form onSubmit={handlePost}>
          <section className="">
            <div className="mt-0">
              <p className="font-normal text-xs text-[#8C8A8A] mb-3">
                Event type
              </p>
              <MainSelect
                typeOfServiceOptions={typeOfServiceOptions}
                typeOfService={eventType}
                setTypeOfService={setEventType}
                required
              />
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                Event name*
              </p>
              <input
                className="bg-[#F5F4F4] rounded-[15px] py-2 px-5 border-none w-full"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                Event range date*
              </p>
              <DateRangePicker
                ranges={[selectionRanges]}
                minDate={new Date()}
                rangeColors={["#fd5b61"]}
                onChange={handleChange}
                className="mx-auto w-full"
              />
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                Address*
              </p>
              <input
                className="bg-[#F5F4F4] rounded-[15px] py-2 px-5 border-none w-full"
                type="text"
                value={eventAddress}
                onChange={(e) => setEventAddress(e.target.value)}
                required
                disabled={eventType === "Online"}
              />
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                External event link
              </p>
              <input
                className="bg-[#F5F4F4] rounded-[15px] py-2 px-5 border-none w-full disabled:bg-[#fdfdfd]"
                type="url"
                placeholder="e.g; https://example.com"
                id="domain"
                onChange={(e) => setLink(e.target.value)}
                value={link}
                required
              />
            </div>

            <div className="mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">
                Description
              </p>
              <textarea
                className="py-2 px-5 w-full h-32 bg-[#f5f4f4] rounded-[15px] border-none"
                name=""
                id=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols={30}
                rows={10}
                required
              />
            </div>

            <div className="max-w-xl mt-5">
              <p className="font-normal text-xs text-[#8C8A8A] mb-2">Image *</p>
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
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-8 py-1 text-[12px] font-semibold text-white bg-[#FF41A9] rounded-full not-italic capitalize disabled:opacity-50"
              disabled={!session}
            >
              Post
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EventFeed;
