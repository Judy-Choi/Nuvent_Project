import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

const EmotionBar = () => {
  const [bar, setBar] = useState([]);

  useEffect(() => {
    fetch('/data/emotionbar.json')
      .then(res => res.json())
      .then(data => {
        setBar(data);
      });
  }, []);

  if (bar.length === 0) {
    return null;
  }

  return (
    <div className="w-[80rem] h-[30rem] ml-5 z-0">
      <ResponsiveBar
        data={bar}
        keys={['positive', 'negative']}
        indexBy="platform"
        margin={{ top: 40, right: 30, bottom: 70, left: 50 }}
        padding={0.6}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'pastel2' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Emotion',
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
            translateX: 30,
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

export default EmotionBar;
