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
    <section className="max-w-md mx-auto my-10 md:my-0 md:max-w-none md:mx-0 flex flex-col items-center h-screen md:flex-row ">
      <div className="relative block w-full md:h-screen md:bg-gray-400 lg:block md:w-1/3 xl:w-1/3">
        <img
          src="https://dummyimage.com/600x500/F3F4F7/64748b"
          alt=""
          className="absolute object-cover w-full h-full hidden md:flex"
        />
        <div className="relative z-10 m-6 md:m-12 text-left">
          <NextLink href="/">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
          </NextLink>
        </div>
      </div>
      <div className="flex w-full md:h-screen px-6 bg-blue-1300 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
        <div className="w-full md:py-32 lg:py-6 lg:h-100">
          <h1 className="my-12 text-2xl font-semibold tracking-tighter text-blue-700 sm:text-3xl title-font">
            Sign up
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
                  className="block flex justify-center w-full px-4 py-3 mt-10 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
                >
                  {isSubmitting ? (
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="animate-spin"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                    </svg>
                  ) : (
                    "Sign Up"
                  )}
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
