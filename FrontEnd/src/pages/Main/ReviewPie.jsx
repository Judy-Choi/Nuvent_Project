import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

const ReviewPie = () => {
  const [pie, setPie] = useState([]);

  useEffect(() => {
    fetch('/data/reviewpie.json')
      .then(res => res.json())
      .then(data => {
        setPie(data);
      });
  }, []);

  if (pie.length === 0) {
    return null;
  }

  return (
    <div className="w-[20rem] h-[35rem] mt-[-5rem]">
      <ResponsivePie
        data={pie}
        margin={{ top: 120, right: 20, bottom: 240, left: 20 }}
        innerRadius={0.65}
        padAngle={2}
        activeOuterRadiusOffset={8}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'column',
            justify: false,
            translateX: -50,
            translateY: 250,
            itemsSpacing: 0,
            itemWidth: 125,
            itemHeight: 40,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default ReviewPie;
