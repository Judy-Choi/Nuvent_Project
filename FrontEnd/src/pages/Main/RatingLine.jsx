import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

const RatingLine = ({ data }) => {
  const [line, setLine] = useState([]);

  useEffect(() => {
    if (!data || !data?.platform_count) {
      return;
    }

    const chartData = Object.keys(data.platform_count)
      .reverse()
      .map(company => {
        const reviewCounts = data.platform_count[company];
        return {
          id: company,
          data: reviewCounts.map((count, index) => {
            return {
              x: `${index + 1}`,
              y: count,
            };
          }),
        };
      });
    setLine(chartData);
  }, [data]);

  if (line.length === 0) {
    return null;
  }

  return (
    <div className="w-[80rem] h-[30rem] ml-5">
      <ResponsiveLine
        data={line}
        margin={{ top: 50, right: 110, bottom: 80, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        enableSlices="x"
        sliceTooltip={({ slice }) => {
          return (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}
            >
              {slice.points.map(point => (
                <div
                  key={point.id}
                  style={{
                    display: 'flex',
                    gap: '2px',
                    color: point.serieColor,
                    padding: '3px 0',
                  }}
                >
                  <strong>rating: {point.data.xFormatted}점</strong>
                  <strong>count : {point.data.yFormatted}개</strong>
                </div>
              ))}
            </div>
          );
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 0,
          tickPadding: 6,
          tickRotation: 0,
          legend: 'rating',
          legendOffset: 35,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        colors={{ scheme: 'pastel1' }}
        lineWidth={3}
        pointSize={7}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 25,
            translateY: 67,
            itemsSpacing: 10,
            itemDirection: 'left-to-right',
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.85,
            symbolSize: 20,
            symbolShape: 'square',
            symbolTextColor: 'white',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: 'rgba(0, 0, 0, 0.03)',
                  itemOpacity: 1,
                },
              },
            ],
            reverse: true,
          },
        ]}
      />
    </div>
  );
};

export default RatingLine;
