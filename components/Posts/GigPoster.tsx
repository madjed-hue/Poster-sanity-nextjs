import Image from "next/image";
import React from "react";
import ProfileImage from "../../assets/1.jpg";
import PostImage from "../../assets/post-img.svg";
import { GoLocation } from "react-icons/go";
import { GiPriceTag } from "react-icons/gi";

const GigPoster = () => {
  return (
    <div className="post my-4 p-4 bg-white rounded-xl">
      <div className="box">
        <div className="post">
          <div className="post-user-info flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src={ProfileImage}
                alt="avatar"
                width={85}
                height={85}
                className="rounded-full"
              />
              <div className="ml-4">
                <h3 className="line1 font-semibold text-base mb-1">
                  Fateh Beddiaf
                </h3>
                <p className="text-xs not-italic font-normal text-[#595858] capitalize">
                  Full Stack Developer
                </p>
              </div>
            </div>
            <p className="line2 text-mainColor font-semibold text-sm">now</p>
          </div>

          <p className="line3 text-sm font-semibold mb-2 lg:pl-2">
            Interactive Website Design&nbsp; •&nbsp;{" "}
            <span className="font-normal text-xs">Remote</span>
          </p>

          <p className="line4 text-sm mb-4 lg:pl-2">
            Forget about boring static designs! My interactive designs always
            will take you on a jouney. I can guarantee that the animations and
            playful transitions will keep you engage throughout the whole
            experience
          </p>

          <div className="price flex items-center text-mainColor mb-2">
            <GiPriceTag />
            <p className="price-line ml-2 font-semibold">$30/h</p>
          </div>

          <div className="location flex items-center text-pink-600">
            <GoLocation />
            <p className="location-line ml-2 font-semibold">Bali, indonesia</p>
          </div>

          <img src={PostImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GigPoster;
