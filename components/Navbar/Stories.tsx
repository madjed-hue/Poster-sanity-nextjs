import React, { useContext, useEffect, useState } from "react";
import { AllStoriesContext, StoryContext } from "../../pages";
import { fetchStories } from "../../utils/fetchStories";

export const diff_hours = (dt2: Date, dt1: Date) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
};

const Stories = () => {
  const storyContext = useContext(StoryContext);
  const allstoriesValue = useContext(AllStoriesContext);

  const outDatedStory = allstoriesValue?.allStories?.filter(
    (story, i) =>
      diff_hours(new Date(story._createdAt), new Date(Date.now())) <= 23
  );

  useEffect(() => {
    const fetchAllStories = async () => {
      const { allStories } = await fetchStories();
      allstoriesValue?.setAllStories(allStories);
    };
    fetchAllStories();
  }, []);

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg">
      <div className="py-1 flex items-center space-x-3 w-full overflow-x-scroll scrollbar-hide">
        {outDatedStory &&
          outDatedStory?.map((story) => (
            <div
              className="flex flex-col items-center justify-center"
              key={story._id}
            >
              <div
                className="bg-mainColor rounded-full p-[2px] w-14 h-14 cursor-pointer"
                onClick={() => storyContext?.setIsOpen(true)}
              >
                {story.storyType === "image" && (
                  <img
                    className="rounded-full h-full w-full object-cover border-white border-2"
                    src={story?.url!}
                  />
                )}
                {story.storyType === "video" && (
                  <video
                    className="rounded-full h-full w-full object-cover border-white border-2"
                    src={story?.url!}
                  />
                )}
              </div>
              <span className="text-xs font-montserrat">
                {story?.user?.username?.replace(/\s+/g, "_").toLowerCase()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Stories;
