import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStore } from '../modules/reviewStore';

const SelectStore = () => {
  const store = useSelector(state => state.reviewStore.store);
  const dispatch = useDispatch();

  const selectStore = newStore => {
    dispatch(setStore(newStore));
  };

  return (
    <div className="z-10">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-purple hover:bg-lightpurple font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-purple dark:hover:bg-lightpurple"
        type="button"
      >
        {store || '매장 선택'}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
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
          {['삼성점', '선릉점', '역삼점', '강남점'].map(store => {
            return (
              <li key={store}>
                <div
                  onClick={() => selectStore(store)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-lightpurple dark:hover:text-white"
                >
                  {store}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SelectStore;
