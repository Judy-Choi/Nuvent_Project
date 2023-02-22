import React from 'react';
import 'flowbite';
import SelectStore from './SelectStore';
const Nav = () => {
  return (
    <div className="flex items-center pt-3 max-h-96">
      <a href="/">
        <img
          className="mx-10 h-12"
          src="https://user-images.githubusercontent.com/101877533/219550306-cde1c1ce-e029-40e9-8b05-de97db9e7cf9.jpg"
          alt="logo"
        />
      </a>
      <SelectStore />
    </div>
  );
};

export default Nav;
