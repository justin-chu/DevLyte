import React from "react";
import { Formik, Form } from "formik";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
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
            Login
          </h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmpassword: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              console.log(values);
              const response = await login({
                username: values.username,
                password: values.password,
              });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
                // } else if (response.data?.login.user) {
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
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
                <div className="mt-2 text-right">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-relaxed text-gray-700 hover:text-blue-700 focus:text-blue-700"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-8 text-center">
            Need an account?
            <a
              href="#"
              className="font-semibold text-blue-500 hover:text-blue-400"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
