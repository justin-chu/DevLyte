import { Layout } from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import React, { useState } from "react";
import { Post } from "../components/Post";
import { Filter } from "../components/Filter";
import NextLink from "next/link";
import { isServer } from "../utils/isServer";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data: meData, fetching: meFetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables: { limit: 15 },
    pause: isServer(),
  });
  if (!fetching && !data) {
    // console.log(error);
    return <div>No posts</div>;
  }
  return (
    <Layout>
      {!data && fetching ? (
        <div>loading</div>
      ) : (
        <div>
          {meData?.me === null && (
            <div className="relative bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="relative z-10 py-8 bg-white sm:pb-16 md:py-20 lg:max-w-2xl lg:w-full lg:py-28 xl:py-32">
                  <svg
                    className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                    fill="currentColor"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <polygon points="50,0 100,0 50,100 0,100" />
                  </svg>

                  <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div className="sm:text-center lg:text-left">
                      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block xl:inline">
                          Join a community of
                        </span>
                        <span className="block text-indigo-600 xl:inline">
                          {" "}
                          developers
                        </span>
                      </h1>
                      <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Share your favourite side projects or find and
                        participate in other awesome projects.
                      </p>
                      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                          <NextLink href="register">
                            <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                              Sign Up
                            </div>
                          </NextLink>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
              <div className="hidden lg:flex lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                  className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                  src="https://miro.medium.com/max/2400/1*J2Q8zG3qjlmhb4DRnI5cNg.jpeg"
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Explore projects
            </h1>
            <Filter />
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-10">
              {data!.posts.posts.map((p) =>
                !p ? null : <Post key={p.id} post={p} />
              )}
            </div>
          </div>
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
