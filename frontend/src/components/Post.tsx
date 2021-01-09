import React, { useState } from "react";
import { PostButton } from "./PostButton";
import NextLink from "next/link";
import {
  PostFragmentFragment,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

interface PostProps {
  post: PostFragmentFragment;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const date = timeAgo.format(parseInt(post.createdAt));
  const [more, setMore] = useState(false);
  const [, deletePost] = useDeletePostMutation();
  const [{ data: me }] = useMeQuery();

  return (
    <NextLink key={post.id} href="/post/[id]" as={`/post/${post.id}`}>
      <div className="transition-shadow rounded-2xl mb-4 my-2 hover:bg-white-900 hover:shadow-md cursor-pointer">
        {/* <NextLink key={post.id} href="/post/[id]" as={`/post/${post.id}`}> */}
        <img
          className="rounded-2xl bg-white dark:bg-gray-800 w-max h-56 cursor-pointer"
          src="https://dummyimage.com/600x500/F3F4F7/64748b"
          alt=""
        />
        {/* </NextLink> */}
        <div className="px-4 py-5">
          <ul className="flex items-center py-0.5 pb-2 gap-4 overflow-x-auto disable-scrollbars">
            <li>
              <span className="w-full px-2 py-1 text-xs rounded-lg text-gray-600 bg-gray-200 transition hover:bg-gray-500 hover:text-white">
                React
              </span>
            </li>
            <li>
              <span className="w-full px-2 py-1 text-xs rounded-lg text-gray-600 bg-gray-200 transition hover:bg-gray-500 hover:text-white">
                React
              </span>
            </li>
            <li>
              <span className="w-full px-2 py-1 text-xs rounded-lg text-gray-600 bg-gray-200 transition hover:bg-gray-500 hover:text-white">
                React
              </span>
            </li>
            <li>
              <span className="w-full px-2 py-1 text-xs rounded-lg text-gray-600 bg-gray-200 transition hover:bg-gray-500 hover:text-white">
                React
              </span>
            </li>
            <li>
              <span className="w-full px-2 py-1 text-xs rounded-lg text-gray-600 bg-gray-200 transition hover:bg-gray-500 hover:text-white">
                React
              </span>
            </li>
            <li>
              <span className="w-full px-2 py-1 text-xs rounded-lg text-gray-600 bg-gray-200 transition hover:bg-gray-500 hover:text-white">
                React
              </span>
            </li>
            <li>
              <span className="w-full px-2 py-1 text-xs rounded-lg text-gray-600 bg-gray-200 transition hover:bg-gray-500 hover:text-white">
                React
              </span>
            </li>
            <li>
              <span className="w-full px-2 py-1 text-xs rounded-lg text-gray-600 bg-gray-200 transition hover:bg-gray-500 hover:text-white">
                React
              </span>
            </li>
          </ul>
          {/* <NextLink key={post.id} href="/post/[id]" as={`/post/${post.id}`}>
          <> */}
          <p className="text-gray-600 dark:text-gray-100 text-xl font-bold mx-1">
            {post.title}
          </p>
          <p className="text-gray-400 text-sm my-2 mx-1">{post.textSnippet}</p>
          {/* </>
        </NextLink> */}
          <div className="mt-3 flex justify-between">
            <a className="flex items-center" href="#">
              <img
                className="mx-1 my-1 w-8 h-8 object-cover rounded-full hidden sm:block transition hover:opacity-70"
                src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                alt="avatar"
              />
              <div className="mx-1">
                <h1 className="text-gray-700 font-medium text-sm">
                  {post.creator.username}
                </h1>
                <h1 className="text-gray-400 text-xs">{date}</h1>
              </div>
            </a>
            <div className="flex items-center gap-4 mt-0.5">
              <button
                onClick={() => setMore(!more)}
                className={`flex flex-col text-center text-xs text-gray-400 mb-4 items-center transition hover:text-red-500`}
              >
                <svg
                  width="18"
                  height="18"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                {more && (
                  <div className="origin-top-right absolute mt-6 mr-20 w-24 rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1 "
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {me?.me?.id === post.creator.id && (
                        <>
                          <button
                            onClick={() => {
                              deletePost({ id: post.id });
                            }}
                            className="flex items-center block px-4 py-2 text-md text-gray-400 transition hover:text-red-500"
                            role="menuitem"
                          >
                            <svg
                              width="18"
                              height="18"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="flex flex-col">
                              <span>Delete</span>
                            </span>
                          </button>
                          <NextLink
                            href="/post/edit/[id]"
                            as={`/post/edit/${post.id}`}
                          >
                            <div
                              role="menuitem"
                              className="flex items-center block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                            >
                              <svg
                                width="18"
                                height="18"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                              <span className="flex flex-col">
                                <span>Edit</span>
                              </span>
                            </div>
                          </NextLink>
                        </>
                      )}
                      <a
                        href="#"
                        className="flex items-center block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        <svg
                          width="18"
                          height="18"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="flex flex-col">
                          <span>Report</span>
                        </span>
                      </a>
                    </div>
                  </div>
                )}
              </button>
              <PostButton icon="share" post={post} />
              <PostButton icon="comment" post={post} />
              <PostButton icon="like" post={post} />
            </div>
          </div>
        </div>
      </div>
    </NextLink>
  );
};
