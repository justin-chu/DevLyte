import React from "react";
import { PostFragmentFragment, useVoteMutation } from "../generated/graphql";

interface PostButtonProps {
  icon: String;
  post: PostFragmentFragment;
}

export const PostButton: React.FC<PostButtonProps> = ({ icon, post }) => {
  const [, vote] = useVoteMutation();
  return (
    <div
      className={`flex flex-col text-center text-xs ${
        icon === "like" && post.voteStatus ? "text-red-400 " : "text-gray-400"
      } items-center transition hover:text-red-500`}
    >
      <button
        onClick={() => {
          if (icon === "share") {
          }
          if (icon === "comment") {
          }
          if (icon === "like") {
            vote({
              postId: post.id,
            });
          }
        }}
      >
        <svg
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          {icon === "share" && (
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          )}
          {icon === "comment" && (
            <path
              fillRule="evenodd"
              d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          )}
          {icon === "like" && (
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>
      {icon === "share" && "21"}
      {icon === "comment" && "304"}
      {icon === "like" && post.points}
    </div>
  );
};
