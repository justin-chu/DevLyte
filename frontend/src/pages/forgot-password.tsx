import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <section className="flex flex-col items-center h-screen md:flex-row ">
      <div className="flex w-full h-screen px-6 bg-blue-1300 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
        <div className="w-full py-32 lg:py-6 lg:h-100">
          <h1 className="my-12 text-2xl font-semibold tracking-tighter text-blue-700 sm:text-3xl title-font">
            Reset password
          </h1>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values, { setErrors }) => {
              await forgotPassword(values);
              setComplete(true);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                />
                <button
                  type="submit"
                  className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
                >
                  Reset Password
                </button>
              </Form>
            )}
          </Formik>
          {complete && (
            <div
              className="bg-green-200 border-green-600 text-green-600 border-l-4 p-4 mt-12"
              role="alert"
            >
              <p className="font-bold">Email sent</p>
              <p>
                Reset your password by following the instructions in the email!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
