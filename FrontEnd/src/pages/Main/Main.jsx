import React from 'react';
import RatingRadar from './RatingRadar';
import ReviewBar from './ReviewBar';
import ReviewPie from './ReviewPie';

const Main = () => {
  return (
    <div className="mt-10">
      <div className="flex justify-center items-center bg-slate-50 mx-10 my-10 pb-5 rounded-xl z-0">
        <ReviewBar />
        <ReviewPie />
      </div>
      <div className="flex justify-center items-center bg-slate-50 mx-10 my-10 pb-5 rounded-xl z-0">
        <ReviewBar />
        <RatingRadar />
      </div>
      <div className="flex justify-center items-center bg-slate-50 mx-10 my-10 pb-5 rounded-xl z-0">
        <ReviewBar />
        <ReviewPie />
      </div>
    </div>
  );
};

export default Main;
