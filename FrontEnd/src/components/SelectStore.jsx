import React from 'react';

const SelectStore = () => {
  return (
    <div className="z-10">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-purple hover:bg-lightpurple font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-purple dark:hover:bg-lightpurple"
        type="button"
      >
        매장 선택
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className="hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-purple"
      >
        <ul
          className="py-2 text-center text-sm text-purple dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-lightpurple dark:hover:text-white"
            >
              삼성점
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-lightpurple dark:hover:text-white"
            >
              선릉점
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-lightpurple dark:hover:text-white"
            >
              역삼점
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-lightpurple dark:hover:text-white"
            >
              강남점
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SelectStore;
