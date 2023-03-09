import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const ReviewBar = ({ data }) => {
  const [bar, setBar] = useState([]);

  useEffect(() => {
    if (!data || !data?.period_count || data?.period_count.length === 0) {
      return;
    }

    const chartData = data.period_count.map((data, index) => {
      const platform =
        'date' in data
          ? data.date
          : 'week' in data
          ? data.week
          : 'month' in data
          ? data.month
          : '';
      return {
        ...data,
        platform,
      };
    });
    setBar(chartData);
  }, [data]);

  if (bar.length === 0) {
    return null;
  }

  return (
    <div className="w-[80rem] h-[30rem] ml-5 z-0">
      <ResponsiveBar
        data={bar}
        keys={['baemin', 'yogiyo', 'coupang']}
        indexBy="platform"
        margin={{ top: 40, right: 30, bottom: 70, left: 50 }}
        padding={0.6}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'pastel1' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Day',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Review Count',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        enableGridX={false}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', '1.6']],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 9,
            translateY: 68,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        motionConfig={{
          mass: 1,
          tension: 150,
          friction: 10,
          clamp: false,
          precision: 0.01,
          velocity: 0,
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default ReviewBar;
