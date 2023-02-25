import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import 'react-datepicker/dist/react-datepicker.min.js';

const SelectDate = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <div className="z-10 ml-10">
      <DatePicker
        showIcon
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={update => {
          setDateRange(update);
        }}
        isClearable={true}
        placeholderText="날짜를 선택하세요."
        dateFormat="yyyy/MM/dd"
        wrapperClassName="relative"
        className="flex justify-center items-center w-56 rounded-md border-purple shadow-sm"
      />
    </div>
  );
};

export default SelectDate;
