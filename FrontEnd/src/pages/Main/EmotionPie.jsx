import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

const EmotionPie = ({ data }) => {
  const [pie, setPie] = useState([]);

  useEffect(() => {
    if (!data || !data?.sentiment_ratings) {
      return;
    }

    const chartData = [
      { id: '1', label: 'positive', value: 0, color: '#FAB4AE' },
      {
        id: '2',
        label: 'negative',
        value: 0,
        color: 'hsl(298, 70%, 50%)',
      },
    ];

    chartData[0].value = data.sentiment_ratings.reduce((acc, cur) => {
      const next = acc + cur.positive;
      return next;
    }, 0);
    chartData[1].value = data.sentiment_ratings.reduce((acc, cur) => {
      const next = acc + cur.negative;
      return next;
    }, 0);
    setPie(chartData);
  }, [data]);

  if (pie.length === 0) {
    return null;
  }

  return (
    <div className="w-[20rem] h-[35rem] mt-[-5rem]">
      <ResponsivePie
        data={pie}
        margin={{ top: 150, right: 20, bottom: 240, left: 20 }}
        innerRadius={0}
        padAngle={0}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'pastel2' }}
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
        id="label"
        valueFormat="time:%Y/%m/%d"
        legends={[
          {
            anchor: 'bottom',
            direction: 'column',
            justify: false,
            translateX: -50,
            translateY: 150,
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

export default EmotionPie;
