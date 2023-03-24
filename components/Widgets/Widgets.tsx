import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

interface SingleFeedTypes {
  data: {
    preview: {
      images: {
        source: {
          url: string;
        };
      }[];
    };
    link_flair_text: string;
    ups: number;
    title: string;
    id: string;
    url: string;
  };
}

const SingleFeed = ({ data }: SingleFeedTypes) => {
  const { preview, link_flair_text, ups, title, url } = data;

  return (
    <>
      {preview && (
        <div className="flex flex-col my-4">
          <img
            src={preview?.images[0]?.source?.url?.split("amp;").join("")}
            alt={link_flair_text}
            className="mt-4 object-contain"
          />
          <div className="texts ml-3">
            <h3 className="feed-line1 text-[12px] font-semibold text-gray-800 my-2">
              {title.substring(0, 80).concat("...") || link_flair_text}
            </h3>
            <p className="feed-line2 text-xs font-normal text-gray-800">
              Vote : {ups}
            </p>
            <Link
              href={url}
              className="feed-btn py-1 px-4 border border-solid border-gray-500 rounded-full text-[8px]"
            >
              visit
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

const Widgets = () => {
  const [feeds, setFeeds] = useState<SingleFeedTypes[]>();
  const lowerNumber = Math.abs(16 - Math.floor(Math.random() * 16));
  const maxNumber = Math.abs(lowerNumber + 10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFeeds() {
      setLoading(true);
      const req = await axios.get("https://www.reddit.com/r/webdev.json");
      const results = req.data;
      setFeeds(results.data.children);
      setLoading(false);
    }
    fetchFeeds();
  }, []);
  return (
    <div className="feed mb-40">
      <div className="bg-white p-4 rounded-2xl">
        <h2 className="box-line1 text-base font-semibold">Explore feeds</h2>

        {loading ? (
          <>
            <div>
              <Skeleton height={150} />
              <Skeleton count={3} />
            </div>
            <div>
              <Skeleton height={150} />
              <Skeleton count={3} />
            </div>
            <div>
              <Skeleton height={150} />
              <Skeleton count={3} />
            </div>
            <div>
              <Skeleton height={150} />
              <Skeleton count={3} />
            </div>
          </>
        ) : (
          feeds?.map((feed) => (
            <SingleFeed data={feed.data} key={feed.data.id} />
          ))
        )}

        <p className="box-line2 font-semibold text-[10px] ">
          View all recommendations →
        </p>
      </div>
    </div>
  );
};

export default Widgets;
