import React from "react";

const MainSelect = ({
  typeOfServiceOptions,
  typeOfService,
  setTypeOfService,
}: any) => {
  return (
    <div className="flex">
      {typeOfServiceOptions.map((option: any, index: number) => (
        <div
          className={`flex cursor-pointer ${
            typeOfServiceOptions.length - 1 !== index && "mr-5"
          }`}
          key={option}
          onClick={() => setTypeOfService(option)}
        >
          <div
            className={`w-[18px] h-[18px] rounded-full mr-2 ${
              typeOfService === option
                ? "bg-[#FF41A9]"
                : "border-[2px] border-solid border-[#8C8A8A]"
            }`}
          />
          <p className="text-xs not-italic font-normal text-[#8C8A8A]">
            {option}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MainSelect;
