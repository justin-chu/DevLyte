import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
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
            Sign Up
          </h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await register({ options: values });
              if (response.data?.register.errors) {
                setErrors(toErrorMap(response.data.register.errors));
                // } else if (response.data?.register.user) {
              } else {
                // successful
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="username"
                  placeholder="Username"
                  label="Username"
                  type="username"
                />
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                />
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
                <InputField
                  name="confirmPassword"
                  placeholder="Confirm password"
                  label="Confirm password"
                  type="password"
                />
                <button
                  type="submit"
                  className="block w-full px-4 py-3 mt-10 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
                >
                  Sign Up
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-8 text-center">
            Already have an account?
            <span className="font-semibold text-blue-500 hover:text-blue-400">
              <NextLink href="/login"> Login</NextLink>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
