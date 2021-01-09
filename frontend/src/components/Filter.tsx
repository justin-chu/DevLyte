import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

interface FilterProps {}

export const Filter: React.FC<FilterProps> = ({}) => {
  const [filter, setFilter] = useState("popular");
  const [open, setOpen] = useState(false);

  const handleBtnClick = (): void => {
    setOpen(!open);
  };

  const closeMenu = (): void => {
    setOpen(false);
  };

  const Popular = ({ check }: { check: boolean }) => (
    <>
      <svg
        className="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
          clipRule="evenodd"
        />
      </svg>
      <span className="ml-3 block truncate text-gray-500 font-medium">
        Popular
      </span>
      {check && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </>
  );

  const Following = ({ check }: { check: boolean }) => (
    <>
      <svg
        className="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
      <span className="ml-3 block truncate text-gray-500 font-medium">
        Following
      </span>
      {check && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </>
  );

  return (
    <div className="w-48 pt-4">
      <label
        id="listbox-label"
        className="block text-sm font-medium text-gray-700"
      >
        Filter
      </label>
      <OutsideClickHandler onOutsideClick={() => closeMenu()}>
        <div className="mt-1 relative">
          <button
            onClick={() => handleBtnClick()}
            type="button"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-200 focus:border-red-200 hover:outline-none hover:ring-1 hover:ring-red-200 hover:border-red-200 sm:text-sm cursor-pointer"
          >
            <span className="flex items-center">
              {filter === "popular" ? (
                <Popular check={false} />
              ) : (
                <Following check={false} />
              )}
            </span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          <div
            onClick={() => closeMenu()}
            className={
              open
                ? "absolute mt-1 w-full rounded-md bg-white shadow-lg transition ease-in duration-100"
                : "hidden"
            }
          >
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              <li
                onClick={() => setFilter("popular")}
                id="listbox-item-0"
                role="option"
                className="text-gray-900 select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 cursor-pointer "
              >
                <div className="flex items-center">
                  <Popular check={filter === "popular"} />
                </div>
              </li>
              <li
                onClick={() => setFilter("following")}
                id="listbox-item-0"
                role="option"
                className="text-gray-900 select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 cursor-pointer "
              >
                <div className="flex items-center ">
                  <Following check={filter === "following"} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
