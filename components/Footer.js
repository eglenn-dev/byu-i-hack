import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row h-20 bottom-2 sticky">
      <a className="text-white text-4xl m-auto border-4 border-white rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.3em"
          height="1.3em"
          viewBox="0 0 16 16"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.75 7.75h-10m5-5v10"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default Footer;
