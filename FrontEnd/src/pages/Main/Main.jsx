import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EmotionBar from './EmotionBar';
import EmotionPie from './EmotionPie';
import RatingLine from './RatingLine';
import RatingRadar from './RatingRadar';
import ReviewBar from './ReviewBar';
import ReviewPie from './ReviewPie';

const data = {
  period_count: [
    {
      date: '20221201',
      baemin: 2,
      yogiyo: 1,
      coupang: 0,
    },
    {
      date: '20221202',
      baemin: 0,
      yogiyo: 0,
      coupang: 0,
    },
    {
      date: '20221203',
      baemin: 1,
      yogiyo: 0,
      coupang: 0,
    },
    {
      date: '20221204',
      baemin: 1,
      yogiyo: 0,
      coupang: 0,
    },
    {
      date: '20221205',
      baemin: 0,
      yogiyo: 0,
      coupang: 0,
    },
    {
      date: '20221206',
      baemin: 0,
      yogiyo: 0,
      coupang: 0,
    },
    {
      date: '20221207',
      baemin: 0,
      yogiyo: 0,
      coupang: 0,
    },
  ],
  platform_count: {
    baemin: [0, 0, 0, 0, 4],
    yogiyo: [0, 0, 0, 0, 1],
    coupang: [0, 0, 0, 0, 0],
  },
  sentiment_ratings: [
    {
      platform: 'baemin',
      positive: 4,
      negative: 0,
    },
    {
      platform: 'yogiyo',
      positive: 1,
      negative: 0,
    },
    {
      platform: 'coupang',
      positive: 0,
      negative: 0,
    },
  ],
};

const Main = () => {
  const store = useSelector(state => state.reviewStore.store);
  const startDate = useSelector(state => state.reviewStore.startDate);
  const endDate = useSelector(state => state.reviewStore.endDate);

  const [reviewData, setReviewData] = useState({ ...data });

  useEffect(() => {
    const fetchData = () =>
      fetch(
        `http://10.110.130.129/reviews?storeId=${store}&startDate=${startDate}&endDate=${endDate}`
      )
        .then(res => res)
        .then(data => {
          setReviewData(data);
        })
        .catch(error => {
          console.error(error);
        });
    fetchData();
  }, [store, startDate, endDate]);

  return (
    <div className="mt-10">
      <div className="content z-0">
        <ReviewBar data={reviewData} />
        <ReviewPie data={reviewData} />
      </div>
      <div className="content">
        <RatingLine data={reviewData} />
        <RatingRadar data={reviewData} />
      </div>
      <div className="content">
        <EmotionBar data={reviewData} />
        <EmotionPie data={reviewData} />
      </div>
    </div>
  );
};

export default Main;
