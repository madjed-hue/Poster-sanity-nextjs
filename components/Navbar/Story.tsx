import React, { ReactNode, useContext, useEffect, useState } from "react";
import { AllStoriesContext } from "../../pages";
import { Stories as StoriesType } from "../../typings";
import Stories from "stories-react";
import { diff_hours } from "./Stories";

type Str = {
  type: string | undefined;
  duration: number;
  url: string | null | undefined;
  seeMore?: boolean;
  seeMoreComponent?: ReactNode;
};

const SeeMoreComponent = (title: string, description: string) => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div>
        <h2 className="text-center font-bold mb-2"> {title} </h2>
        <p className="text-center text-gray-800 font-montserrat">
          {description}
        </p>
      </div>
    </div>
  );
};

const Story = () => {
  const allstoriesValue = useContext(AllStoriesContext);
  const [stories, setStories] = useState<StoriesType[] | null | undefined>(
    null
  );

  const outDatedStory = stories?.filter(
    (story) =>
      diff_hours(new Date(story._createdAt), new Date(Date.now())) <= 23
  );

  const ConvertedStories: Str[] = [];
  outDatedStory?.length &&
    outDatedStory.map((story) => {
      const str: Str = {
        type: story.storyType,
        duration: story.duration,
        url: story.url,
        seeMore: story.seeMore,
        seeMoreComponent: SeeMoreComponent(story?.title, story?.description!),
      };
      ConvertedStories.push(str);
    });

  useEffect(() => {
    setStories(allstoriesValue?.allStories);
  }, []);

  return (
    <div>
      <Stories stories={ConvertedStories} height={"600px"} width={"400px"} />
    </div>
  );
};

export default Story;
