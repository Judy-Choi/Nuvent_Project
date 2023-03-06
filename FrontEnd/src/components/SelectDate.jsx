import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import 'react-datepicker/dist/react-datepicker.min.js';
import { useDispatch } from 'react-redux';
import { setEndDate, setStartDate } from '../modules/reviewStore';

const SelectDate = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const dispatch = useDispatch();
  const selectStartDate = date => {
    dispatch(setStartDate(date.getTime()));
  };
  const selectEndDate = date => {
    dispatch(setEndDate(date.getTime()));
  };

  /**
   * startDate, endDate 보낼때
   * date.getTime() 으로 밀리세컨드로 변환한 것을 보내드릴게요
   * 이거 다시 new Date(여기) 이렇게 하면 자바스크립트 Date 객체로 변환되니 이걸로 날짜 필터링해숴 알아서 보내줘용
   */
  // const a = 1679583600000;
  // const date = new Date(a);
  // console.log(date);

  return (
    <div className="z-10 ml-10">
      <DatePicker
        showIcon
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={update => {
          const [start, end] = update;
          setDateRange(update);
          if (start && !end) {
            selectStartDate(start);
          } else if (start && end) {
            selectEndDate(end);
          }
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
