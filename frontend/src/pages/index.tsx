import { Layout } from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import React, { useState } from "react";
import NextLink from "next/link";
import { PostButton } from "../components/PostButton";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({ variables: { limit: 10 } });
  if (!fetching && !data) {
    return <div>No posts</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading</div>
      ) : (
        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-5 mb-10 max-w-7xl">
          {data!.posts.posts.map((p) => (
            <NextLink key={p.id} href="">
              <div className="cursor-pointer transition-shadow rounded-2xl mx-auto mb-10 w-96 max-w-xl my-2 hover:bg-white-900 hover:shadow-md">
                <img
                  className="rounded-2xl bg-white dark:bg-gray-800 w-96 h-56"
                  src="https://dummyimage.com/600x500/F3F4F7/64748b"
                  alt=""
                />
                <div className="max-w-sm px-4 py-5">
                  <ul className="flex items-center py-0.5 gap-4 overflow-x-auto disable-scrollbars">
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
                  <p className="text-gray-600 dark:text-gray-100 text-xl font-bold mx-1">
                    {p.title}
                  </p>
                  <p className="text-gray-400 text-sm my-2 mx-1">
                    {p.textSnippet}
                  </p>
                  <div className="mt-3 flex justify-between">
                    <a className="flex items-center" href="#">
                      <img
                        className="mx-1 my-1 w-8 h-8 object-cover rounded-full hidden sm:block transition hover:opacity-70"
                        src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80"
                        alt="avatar"
                      />
                      <div className="mx-1">
                        <h1 className="text-gray-700 font-medium text-sm">
                          {p.creator.username}
                        </h1>
                        <h1 className="text-gray-400 text-xs">37 min ago</h1>
                      </div>
                    </a>
                    <div className="flex items-center gap-4 mt-0.5">
                      <PostButton icon="share" post={p} />
                      <PostButton icon="comment" post={p} />
                      <PostButton icon="like" post={p} />
                    </div>
                  </div>
                </div>
              </div>
            </NextLink>
          ))}
        </div>
      )}
      {data && data.posts.hasMore ? (
        <button
          onClick={() =>
            setVariables({
              limit: variables.limit,
              cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
            })
          }
        >
          load more
        </button>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
