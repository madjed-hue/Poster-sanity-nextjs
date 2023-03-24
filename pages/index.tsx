import type { GetServerSideProps } from "next";
import Head from "next/head";
import Feed from "../components/Feed/Feed";
import Layout from "../components/Layout/Layout";
import Sidebar from "../components/Sidebar/Sidebar";
import Widgets from "../components/Widgets/Widgets";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { fetchFeeds } from "../utils/fetchFeeds";
import { Feeds, Stories } from "../typings";
import { Toaster } from "react-hot-toast";
import Story from "../components/Navbar/Story";
import { createContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  feeds: {
    allFeeds: Feeds[];
  };
}

type Story = {
  isOpen: boolean | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
};

interface AllStories {
  allStories: Stories[] | null;
  setAllStories: React.Dispatch<React.SetStateAction<Stories[] | null>>;
}

export const StoryContext = createContext<Story | null>(null);

export const AllStoriesContext = createContext<AllStories | null>(null);

const Home = ({ feeds }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(false);
  const [allStories, setAllStories] = useState<Stories[] | null>(null);

  return (
    <div className="max-h-screen overflow-hidden relative">
      <Head>
        <title>Poster-Plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StoryContext.Provider value={{ isOpen, setIsOpen }}>
        <AllStoriesContext.Provider value={{ allStories, setAllStories }}>
          <Toaster />
          {isOpen && (
            <div>
              <div className="absolute w-full h-full bg-black opacity-60 z-40"></div>
              <div className="absolute w-full h-full flex items-center justify-center z-50">
                <Story />
                <AiOutlineClose
                  size={24}
                  className="text-white cursor-pointer top-[15%] right-[3%] lg:right-[33%] absolute font-bold"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
          )}
          <Layout>
            <main className="flex flex-col md:grid grid-cols-9 gap-4 lg:max-w-7xl mx-4 lg:mx-auto h-screen overflow-y-scroll scrollbar-hide">
              <div className="col-span-2 ">
                <Sidebar />
              </div>
              <div className="col-span-7 lg:col-span-5">
                <Feed feeds={feeds} />
              </div>

              <div className="col-span-2 hidden lg:inline overflow-scroll max-h-screen scrollbar-hide">
                <Widgets />
              </div>
            </main>
          </Layout>
        </AllStoriesContext.Provider>
      </StoryContext.Provider>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const feeds = await fetchFeeds("getFeeds");
  return {
    props: {
      feeds,
    },
  };
};
