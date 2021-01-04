import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
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
              Create post
            </h1>
            <Formik
              initialValues={{
                title: "",
                text: "",
              }}
              onSubmit={async (values, { setErrors }) => {
                const { error } = await createPost({ input: values });
                if (!error) {
                  router.push("/");
                }
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
                    Create
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

export default withUrqlClient(createUrqlClient)(CreatePost);
