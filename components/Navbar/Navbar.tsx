import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/PosterLogo.png";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineUsergroupAdd,
  AiOutlineMessage,
  AiOutlineBell,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { IconType } from "react-icons/lib";
import { useSession, signIn, signOut } from "next-auth/react";
import Story from "./Story";
import Stories from "./Stories";
import MainModal from "../Feed/Modals/MainModal";
import StoryFeed from "../Feed/Modals/StoryFeed";

interface NavIconProps {
  href: string;
  Icon: IconType;
  onClick?: () => {};
}

const NavIcon = ({ href, Icon, onClick }: NavIconProps) => {
  return (
    <li onClick={() => onClick?.()}>
      <Link href={href} className="flex content-center justify-center">
        <Icon size={24} />
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { data: session } = useSession();
  const [showAddStoryModal, setShowAddStoryModal] = useState<boolean>(false);

  return (
    <div className="w-full h-30 md:h-24 shadow bg-white flex flex-col justify-center items-center py-4">
      <div className="max-w-7xl w-full">
        <div className="flex items-center justify-between px-2 lg:px-10 md:px-5 relative max-w-screen-2xl mx-auto">
          {/* logo */}
          <div className="flex items-center justify-between md:block w-1/3">
            <Link href="/">
              <Image src={logo} alt="logo" width={90} height={90} />
            </Link>
          </div>

          {/* stories */}
          <div className="flex items-center justify-start sm:justify-evenly w-full">
            <Stories />
            <AiOutlinePlusCircle
              size={45}
              className="cursor-pointer"
              onClick={() => setShowAddStoryModal(true)}
            />
          </div>

          {/* navigation icons */}
          <div className="absolute md:relative right-2 text-center top-full bg-white w-1/3">
            <div
              className={`flex-1 justify-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                <NavIcon href="/" Icon={AiOutlineHome} />
                <NavIcon href="/friend" Icon={AiOutlineUsergroupAdd} />
                <NavIcon href="/message" Icon={AiOutlineMessage} />
                <NavIcon href="/notification" Icon={AiOutlineBell} />
                <NavIcon
                  onClick={session ? signOut : signIn}
                  href=""
                  Icon={session ? AiOutlineLogout : AiOutlineLogin}
                />
              </ul>
            </div>
          </div>

          {/* toggle btn */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 border border-gray-400 rounded-md"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <MainModal
        show={showAddStoryModal}
        setShow={setShowAddStoryModal}
        title="Create a Story"
      >
        <StoryFeed />
      </MainModal>
    </div>
  );
};

export default Navbar;
