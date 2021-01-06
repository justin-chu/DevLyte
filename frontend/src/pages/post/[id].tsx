import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetIntId } from "../../utils/useGetIntId";

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
      <h1 className="text-2xl font-bold">{data.post.title}</h1>
      <img
        className="rounded-2xl bg-white dark:bg-gray-800 w-96 h-56"
        src="https://dummyimage.com/600x500/F3F4F7/64748b"
        alt=""
      />
      <h1>{data.post.text}</h1>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
