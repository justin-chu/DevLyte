import { Layout } from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import React, { useState } from "react";
import { Post } from "../components/Post";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({ variables: { limit: 15 } });
  if (!fetching && !data) {
    return <div>No posts</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <div>loading</div>
      ) : (
        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-5 mb-10">
          {data!.posts.posts.map((p) => (!p ? null : <Post post={p} />))}
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
