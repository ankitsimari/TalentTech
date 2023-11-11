import React from "react";

type TopicButton = {
  title: String;
  handleClick: () => {};
};
const TopicsButton = ({ title, handleClick }: TopicButton) => {
  return (
    <button
      type="button"
      className="focus:outline-none mr-2 text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default TopicsButton;
