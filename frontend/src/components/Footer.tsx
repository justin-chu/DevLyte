import React from "react";
import NextLink from "next/link";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-gray-800 pt-10 sm:mt-10 pt-10 flex flex-col flex-wrap content-center">
      <div className="max-w-4xl text-gray-800 grid gap-24 grid-cols-2 md:grid-cols-4 justify-items-center">
        <div>
          <div className="text-sm uppercase text-gray-200 font-medium mb-6">
            For developers
          </div>

          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Get premium
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Explore
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Find developers
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Code of conduct
          </a>
        </div>

        <div>
          <div className="text-sm uppercase text-gray-200 font-medium mb-6">
            Company
          </div>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            About
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Careers
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Support
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Terms of service
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Privacy policy
          </a>
        </div>

        <div>
          <div className="text-sm uppercase text-gray-200 font-medium mb-6">
            Community
          </div>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            GitHub
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Discord
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Twitter
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            YouTube
          </a>
        </div>

        <div>
          <div className="text-sm uppercase text-gray-200 font-medium mb-6">
            More
          </div>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            FAQ
          </a>
          <a
            href="#"
            className="my-3 block text-gray-400 hover:text-gray-100 text-sm duration-700"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 
            border-t border-gray-500 text-gray-400 text-sm 
            flex-col md:flex-row max-w-6xl"
        >
          <div className="mt-2 text-gray-400 text-sm">
            © 2021 DevLyte. All rights reserved.
          </div>

          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-facebook-f"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-twitter-alt"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-youtube"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-linkedin"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
