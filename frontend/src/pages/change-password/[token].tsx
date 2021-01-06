import React, { useState } from "react";
import { NextPage } from "next";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";

const ChangePassword: NextPage = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <section className="flex flex-col items-center h-screen md:flex-row ">
      <div className="flex w-full h-screen px-6 bg-blue-1300 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 items-left justify-left">
        <div className="w-full py-32 lg:py-6 lg:h-100">
          <h1 className="my-12 text-2xl font-semibold tracking-tighter text-blue-700 sm:text-3xl title-font">
            Reset password
          </h1>
          <Formik
            initialValues={{
              newPassword: "",
              confirmNewPassword: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await changePassword({
                newPassword: values.newPassword,
                token:
                  typeof router.query.token === "string"
                    ? router.query.token
                    : "",
                confirmNewPassword: values.confirmNewPassword,
              });
              if (response.data?.changePassword.errors) {
                const errorMap = toErrorMap(
                  response.data.changePassword.errors
                );
                if ("token" in errorMap) {
                  setTokenError(errorMap.token);
                }
                setErrors(errorMap);
              } else {
                // successful
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="newPassword"
                  placeholder="New password"
                  label="New password"
                  type="password"
                />
                <InputField
                  name="confirmNewPassword"
                  placeholder="Confirm new password"
                  label="Confirm new password"
                  type="password"
                />
                <div className="mt-2 text-right">
                  <p className="text-sm font-semibold leading-relaxed text-gray-700 hover:text-blue-700 focus:text-blue-700">
                    <NextLink href="/forgot-password">
                      Forgot Password?
                    </NextLink>
                  </p>
                </div>
                <button
                  type="submit"
                  className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-blue-700 hover:from-blue-600 to-blue-600 hover:to-blue-700 focus:shadow-outline focus:outline-none"
                >
                  Reset Password
                </button>
              </Form>
            )}
          </Formik>
          {tokenError !== "" && (
            <div
              className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4 mt-12"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{tokenError}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword as React.FC);
