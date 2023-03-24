import Image from "next/image";
import React, { useState } from "react";
import ProfileAvatar from "../../assets/ProfileAvatar.png";
import {
  BsFillImageFill,
  BsYoutube,
  BsFillCalendarDateFill,
} from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";
import MainModal from "./Modals/MainModal";
import PhotoFeed from "./Modals/PhotoFeed";
import VideoFeed from "./Modals/VideoFeed";
import EventFeed from "./Modals/EventFeed";
import GigFeed from "./Modals/GigFeed";
import { useSession } from "next-auth/react";

const FeedBox = () => {
  const [showAddPhotoModal, setShowAddPhotoModal] = useState<boolean>(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState<boolean>(false);
  const [showAddEventModal, setShowAddEventModal] = useState<boolean>(false);
  const [showAddGigModal, setShowAddGigModal] = useState<boolean>(false);

  const { data: session } = useSession();

  return (
    <div>
      <div className="create-post">
        <div className="box py-4 bg-white rounded-xl">
          <div className="posts px-5 py-6 sm:py-10 pt-0 grid grid-cols-7 md:grid-cols-5">
            <Image
              src={session?.user?.image || ProfileAvatar}
              alt="avatar"
              width={60}
              height={60}
              className="rounded-full col-span-1 mx-auto"
            />
            <input
              className="posts-input col-span-6 md:col-span-4 bg-gray-100 px-5 py-3 rounded-md w-11/12 focus:outline-none"
              type="text"
              placeholder="Start a post"
            />
          </div>

          <div className="icons flex items-center justify-evenly">
            <div
              className="cursor-pointer flex items-center"
              onClick={() => setShowAddPhotoModal(true)}
            >
              <BsFillImageFill size={24} className="text-teal-500" />
              <p className="icon-text ml-2 text-gray-600 hidden sm:inline-block">
                Photo
              </p>
            </div>

            <div
              className="cursor-pointer flex items-center"
              onClick={() => setShowAddVideoModal(true)}
            >
              <BsYoutube size={24} className="text-red-500" />
              <p className="icon-text ml-2 text-gray-600 hidden sm:inline-block">
                Video
              </p>
            </div>

            <div
              className="cursor-pointer flex items-center"
              onClick={() => {
                setShowAddEventModal(true);
              }}
            >
              <BsFillCalendarDateFill size={24} className="text-yellow-500" />
              <p className="icon-text ml-2 text-gray-600 hidden sm:inline-block ">
                Event
              </p>
            </div>

            <div
              className="cursor-pointer flex items-center"
              onClick={() => setShowAddGigModal(true)}
            >
              <FaRegHandshake size={26} className="text-orange-500" />
              <p className="icon-text ml-2 text-gray-600 hidden sm:inline-block ">
                Gig
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="z-100">
        <MainModal
          show={showAddPhotoModal}
          setShow={setShowAddPhotoModal}
          title="Create a post"
        >
          <PhotoFeed />
        </MainModal>
        <MainModal
          show={showAddVideoModal}
          setShow={setShowAddVideoModal}
          title="Create a post"
        >
          <VideoFeed />
        </MainModal>
        <MainModal
          show={showAddEventModal}
          setShow={setShowAddEventModal}
          title="Create an event"
        >
          <EventFeed />
        </MainModal>
        <MainModal
          show={showAddGigModal}
          setShow={setShowAddGigModal}
          title="Create a gig"
        >
          <GigFeed />
        </MainModal>
      </div>
    </div>
  );
};

export default FeedBox;
