import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { Feeds } from "../../typings";
import { fetchFeeds } from "../../utils/fetchFeeds";
import Poster from "../Posts/Poster";
import FeedBox from "./FeedBox";
import toast from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  feeds: {
    allFeeds: Feeds[];
  };
}

export const FeedContext = createContext<Dispatch<
  SetStateAction<Feeds[]>
> | null>(null);

const Feed = ({ feeds: { allFeeds } }: Props) => {
  const [feeds, setFeeds] = useState<Feeds[]>(allFeeds);
  const value = setFeeds;

  const handleRefresh = async () => {
    const refreshToast = toast.loading("refreshing...");
    const feeds = await fetchFeeds("getFeeds");

    setFeeds(feeds.allFeeds);

    toast.success("Feeds are up to date !.", {
      id: refreshToast,
    });
  };

  return (
    <FeedContext.Provider value={value}>
      <div className="h-screen overflow-y-scroll scrollbar-hide ">
        <div className="flex items-center justify-between mb-2 ">
          {/* search input */}
          <div className="flex-1 mr-3">
            <div className="flex items-center h-10 px-4 border-2 border-gray-700 border-solid rounded-full w-full">
              <AiOutlineSearch size={24} className="cursor-pointer" />
              <input
                type="text"
                placeholder="Search"
                className="pl-2 not-italic font-light text-sm leading-8 text-black tracking-[-0.02em] outline-none w-full bg-transparent"
                style={{ fontFamily: "Poppins" }}
              />
            </div>
          </div>
          <FiRefreshCcw
            size={24}
            className="text-mainColor cursor-pointer transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
            onClick={handleRefresh}
          />
        </div>
        <div>
          <FeedBox />
        </div>
        <div className="mb-36">
          {feeds.map((feed) => (
            <Poster feed={feed} key={feed._id} />
          ))}
        </div>
      </div>
    </FeedContext.Provider>
  );
};

export default Feed;
