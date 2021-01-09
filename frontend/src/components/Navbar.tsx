import React, { useState } from "react";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import OutsideClickHandler from "react-outside-click-handler";

export const Navbar = () => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  const [open, setOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const active =
    "bg-gray-100 text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer";
  const inactive =
    "text-gray-500 hover:bg-gray-100 hover:text-black px-3 py-2 rounded-md text-sm font-medium cursor-pointer";
  const mobileActive =
    "bg-gray-100 text-black block px-3 py-2 rounded-md text-base font-medium";
  const mobileInactive =
    "text-gray-500 hover:bg-gray-100 hover:text-black block px-3 py-2 rounded-md text-base font-medium";

  const handleBtnClick = (): void => {
    setOpen(!open);
  };

  const closeMenu = (): void => {
    setOpen(false);
  };

  const openNav = (): void => {
    setMobileNav(true);
  };

  const closeNav = (): void => {
    setMobileNav(false);
  };

  const NavRight = () => {
    // data is loading or user is not logged in
    if (fetching || !data?.me) {
      return (
        <>
          <div className="flex space-x-2">
            <NextLink href="/login">
              <div className="text-black px-3 py-2 rounded-md text-sm cursor-pointer">
                Login
              </div>
            </NextLink>
            <NextLink href="/register">
              <div className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                Sign Up
              </div>
            </NextLink>
          </div>
        </>
      );
      // user is logged in
    } else {
      return (
        <>
          <div className="hidden sm:flex">
            <NextLink href="/create-post">
              <div className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                Upload
              </div>
            </NextLink>
            <OutsideClickHandler onOutsideClick={() => closeMenu()}>
              <div className="ml-5 relative">
                <div>
                  <button
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    onClick={() => handleBtnClick()}
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>
                {open && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                    onClick={() => closeMenu()}
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Notifications
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <div
                      onClick={async () => {
                        await logout();
                        router.reload();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      role="menuitem"
                    >
                      Sign out
                    </div>
                  </div>
                )}
              </div>
            </OutsideClickHandler>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-black focus:outline-none focus:text-black"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!mobileNav ? (
                <svg
                  onClick={() => openNav()}
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => closeNav()}
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <nav className="sticky top-0 z-50 sm:relative bg-white border-b">
      <OutsideClickHandler onOutsideClick={() => closeNav()}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <NextLink href="/">
                <div className="flex-shrink-0 flex items-center cursor-pointer">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
              </NextLink>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4" onClick={() => closeNav()}>
                  <NextLink href="/">
                    <div
                      className={router.pathname === "/" ? active : inactive}
                    >
                      Explore
                    </div>
                  </NextLink>
                  <NextLink href="/developers">
                    <div
                      className={
                        router.pathname === "/developers" ? active : inactive
                      }
                    >
                      Developers
                    </div>
                  </NextLink>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-black focus:outline-none focus:text-black"
                aria-expanded="false"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <NavRight />
            </div>
          </div>
        </div>
        {mobileNav && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NextLink href="/">
                <div
                  className={
                    router.pathname === "/" ? mobileActive : mobileInactive
                  }
                >
                  Explore
                </div>
              </NextLink>
              <NextLink href="/developers">
                <div
                  className={
                    router.pathname === "/developers"
                      ? mobileActive
                      : mobileInactive
                  }
                >
                  Developers
                </div>
              </NextLink>
            </div>
          </div>
        )}
      </OutsideClickHandler>
    </nav>
  );
};
