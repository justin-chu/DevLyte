import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditPost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1, // don't query if -1
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();
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
      <section className="flex flex-col items-center h-screen md:flex-row ">
        <div className="relative hidden w-full h-screen bg-gray-400 lg:block md:w-1/3 xl:w-1/3">
          <img
            src="https://dummyimage.com/600x500/F3F4F7/64748b"
            alt=""
            className="absolute object-cover w-full h-full"
          />
          <div className="relative z-10 m-12 text-left">
            <a className="flex items-center w-32 mb-4 font-medium text-gray-900 title-font md:mb-6">
              {/* <img src="./dist/badges/WhitePink.svg" alt="" /> */}
            </a>
            <h1 className="mb-2 text-2xl font-semibold tracking-tighter text-blue-700 tsm:text-5xl title-font">
              Discover 100+
              <br />
              screens ready to use.
            </h1>
          </div>
        </div>
        <div className="flex w-full h-screen px-6 bg-blue-1300 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
          <div className="w-full py-32 lg:py-6 lg:h-100">
            <h1 className="my-12 text-2xl font-semibold tracking-tighter text-blue-700 sm:text-3xl title-font">
              Edit post
            </h1>
            <Formik
              initialValues={{
                title: data.post.title,
                text: data.post.text,
              }}
              onSubmit={async (values, { setErrors }) => {
                await updatePost({ id: intId, ...values });
                router.push("/");
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <InputField name="title" placeholder="Title" label="Title" />
                  <InputField
                    textarea
                    name="text"
                    placeholder="Text"
                    label="Text"
                  />
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
                  >
                    Edit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
