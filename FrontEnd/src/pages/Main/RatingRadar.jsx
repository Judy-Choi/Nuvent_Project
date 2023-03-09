import React, { useEffect, useState } from 'react';
import { ResponsiveRadar } from '@nivo/radar';

const RatingRadar = ({ data }) => {
  const [radar, setRadar] = useState([]);

  useEffect(() => {
    if (!data || !data?.platform_count) {
      return;
    }
    const companyNameList = Object.keys(data.platform_count);
    const chartData = [];
    for (let i = 0; i < 5; i++) {
      const ratingData = {
        rating: i + 1,
      };
      for (let companyName of companyNameList) {
        ratingData[companyName] = data.platform_count[companyName][i];
      }
      chartData.push(ratingData);
    }
    setRadar(chartData);
  }, [data]);

  if (radar.length === 0) {
    return null;
  }
  return (
    <div className="w-[20rem] h-[35rem]">
      <ResponsiveRadar
        data={radar}
        keys={['baemin', 'yogiyo', 'coupang']}
        indexBy="rating"
        valueFormat=" >-.2f"
        margin={{ top: 120, right: 20, bottom: 240, left: 20 }}
        borderColor={{ from: 'color' }}
        gridShape="linear"
        gridLabelOffset={35}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'pastel1' }}
        blendMode="multiply"
        legends={[
          {
            anchor: 'bottom',
            direction: 'column',
            justify: false,
            translateX: -100,
            translateY: -150,
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

export default RatingRadar;
