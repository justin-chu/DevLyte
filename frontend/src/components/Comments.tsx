import React, { useState } from "react";
import { Comment, useCommentMutation } from "../generated/graphql";

interface CommentsProps {
  id: number;
  comments: Comment[];
}

export const Comments: React.FC<CommentsProps> = ({ id, comments }) => {
  const [, comment] = useCommentMutation();
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const postComment = async () => {
    setSubmitting(true);
    comment({ text: message, postId: id }).then(() => {
      setSubmitting(false);
      setMessage("");
    });
  };

  return (
    <div className="mt-8">
      <label className="block text-sm text-gray-00">Leave a comment</label>
      <textarea
        className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
        id="comment"
        name="comment"
        placeholder="Leave a comment"
        aria-label="Leave a comment"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={() => postComment()}
        className="inline-flex float-right items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {submitting ? (
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="-ml-1 mr-2 h-5 w-5 text-gray-500 animate-spin"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
          </svg>
        ) : (
          <svg
            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        )}
        Send
      </button>
      <div className="mt-10">
        {comments.map((c) => {
          return (
            <div>
              <h1>{c.text}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};
