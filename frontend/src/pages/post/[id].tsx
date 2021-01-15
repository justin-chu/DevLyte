import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetIntId } from "../../utils/useGetIntId";
import { Comments } from "../../components/Comments";

export const Post = ({}) => {
  const intId = useGetIntId();
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1, // don't query if -1
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data?.post) {
    return <div>no post</div>;
  }

  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-col lg:flex-row">
          <div className="w-full lg:w-172 order-2 lg:order-1">
            <ul className="flex items-center py-0.5 pb-4 gap-4 overflow-x-auto disable-scrollbars">
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
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {data.post.title}
            </h2>
            <div className="flex justify-between mt-4 mb-6">
              <a className="flex items-center" href="#">
                <img
                  className="mx-1 my-1 w-8 h-8 object-cover rounded-full hidden sm:block transition hover:opacity-70"
                  src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                  alt="avatar"
                />
                <div className="ml-1">
                  <h1 className="text-gray-700 font-medium text-sm">
                    {data.post.creator.username}
                  </h1>
                  <h1 className="text-gray-400 text-xs">Follow</h1>
                </div>
              </a>
              <div className="flex justify-between">
                <span className="block">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    Save
                  </button>
                </span>
                <span className="block ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Like
                  </button>
                </span>
              </div>
            </div>
            <h1 className="text-lg">{data.post.text}</h1>
            <Comments id={data.post.id} comments={data.post.comments ?? []} />
          </div>
          <div className="order-1 lg:order-2">
            <img
              className="rounded-2xl bg-white dark:bg-gray-800 mb-6 w-full h-80 lg:w-128"
              src="https://dummyimage.com/1920x1080/F3F4F7/64748b"
              alt=""
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
