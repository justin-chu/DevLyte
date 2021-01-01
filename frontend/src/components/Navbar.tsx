import React from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // data is loading
  if (fetching) {
    // user is not logged in
  } else if (!data?.me) {
    body = (
      <>
        <h1 className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          <NextLink href="/login">Login</NextLink>
        </h1>
        <h1 className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
          <NextLink href="/register">Sign Up</NextLink>
        </h1>
      </>
    );
    // user is logged in
  } else {
    body = (
      <>
        <div className="ml-3 relative">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <svg
                  width="20"
                  fill="currentColor"
                  height="20"
                  className="text-gray-800"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                </svg>
              </button>
            </div>
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div
                className="py-1 "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div
                  className="block block px-4 py-2 text-md text-gray-700 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                  role="menuitem"
                >
                  <span className="flex flex-col text-gray-400 font-light">
                    <span>Hi, {data.me.username}!</span>
                  </span>
                </div>
                <a
                  href="#"
                  className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                  role="menuitem"
                >
                  <span className="flex flex-col">
                    <span>Settings</span>
                  </span>
                </a>
                <a
                  href="#"
                  className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                  role="menuitem"
                >
                  <span className="flex flex-col">
                    <span>Account</span>
                  </span>
                </a>
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                  role="menuitem"
                >
                  <span className="flex flex-col">
                    <span>Logout</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <nav className="bg-white dark:bg-gray-800  shadow ">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              <a className="flex-shrink-0" href="/">
                <img
                  className="h-8 w-8"
                  src="https://dummyimage.com/600x500/F3F4F7/64748b"
                  alt="Workflow"
                />
              </a>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <h1 className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    <NextLink href="/">Home</NextLink>
                  </h1>
                  <h1 className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    <NextLink href="/login">Login</NextLink>
                  </h1>
                  <h1 className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    <NextLink href="/register">Sign Up</NextLink>
                  </h1>
                  <h1 className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    <NextLink href="/">Home</NextLink>
                  </h1>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">{body}</div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-800 hover:text-gray-400 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NextLink href="/">
              <h1 className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                Home
              </h1>
            </NextLink>
            <a
              className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Gallery
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Content
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
