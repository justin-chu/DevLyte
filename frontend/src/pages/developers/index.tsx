import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return <Layout>developers</Layout>;
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
