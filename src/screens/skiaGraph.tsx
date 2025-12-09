import React from 'react';
import {View, StyleSheet, Dimensions, Platform} from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  Circle,
  Text,
  matchFont,
} from '@shopify/react-native-skia';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CANVAS_WIDTH = SCREEN_WIDTH - 40;
const CANVAS_HEIGHT = 300;
const PADDING = 50;
const GRAPH_WIDTH = CANVAS_WIDTH - PADDING * 2;
const GRAPH_HEIGHT = CANVAS_HEIGHT - PADDING * 2;

//  random X values
const dataPoints = [
  {xValue: 1, value: 0},
  {xValue: 2, value: 62.5},
  {xValue: 3, value: 31.6},
  {xValue: 4, value: 34.0},
  {xValue: 5, value: 44.3},
  {xValue: 6, value: 14.0},
];

// Create fonts for text rendering
const fontFamily = Platform.select({ios: 'Helvetica', default: 'sans-serif'});
const labelFont = matchFont({fontFamily, fontSize: 10});
const valueFont = matchFont({fontFamily, fontSize: 12});
const titleFont = matchFont({fontFamily, fontSize: 9});

const SkiaGraph = () => {
  // Find min and max values for scaling
  const maxValue = 90; // Y-axis max (in thousands USD)
  const minValue = 0;

  // Calculate positions for data points
  const points = dataPoints.map((point, index) => {
    const x = PADDING + (index / (dataPoints.length - 1)) * GRAPH_WIDTH;
    const y =
      CANVAS_HEIGHT -
      PADDING -
      ((point.value - minValue) / (maxValue - minValue)) * GRAPH_HEIGHT;
    return {x, y, value: point.value, xValue: point.xValue};
  });

  // Create the line path
  const linePath = Skia.Path.Make();
  points.forEach((point, index) => {
    if (index === 0) {
      linePath.moveTo(point.x, point.y);
    } else {
      linePath.lineTo(point.x, point.y);
    }
  });

  // Create Y-axis labels
  const yAxisLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  // Create X-axis path
  const xAxisPath = Skia.Path.Make();
  xAxisPath.moveTo(PADDING, CANVAS_HEIGHT - PADDING);
  xAxisPath.lineTo(CANVAS_WIDTH - PADDING, CANVAS_HEIGHT - PADDING);

  // Create Y-axis path
  const yAxisPath = Skia.Path.Make();
  yAxisPath.moveTo(PADDING, PADDING);
  yAxisPath.lineTo(PADDING, CANVAS_HEIGHT - PADDING);

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {yAxisLabels.map((label, index) => {
          const y =
            CANVAS_HEIGHT -
            PADDING -
            ((label - minValue) / (maxValue - minValue)) * GRAPH_HEIGHT;
          const gridPath = Skia.Path.Make();
          gridPath.moveTo(PADDING, y);
          gridPath.lineTo(CANVAS_WIDTH - PADDING, y);

          return (
            <Path
              key={`grid-y-${index}`}
              path={gridPath}
              color="#E5E5E5"
              style="stroke"
              strokeWidth={1}
            />
          );
        })}

        {points.map((point, index) => {
          const gridPath = Skia.Path.Make();
          gridPath.moveTo(point.x, PADDING);
          gridPath.lineTo(point.x, CANVAS_HEIGHT - PADDING);

          return (
            <Path
              key={`grid-x-${index}`}
              path={gridPath}
              color="#E5E5E5"
              style="stroke"
              strokeWidth={1}
            />
          );
        })}

        <Path path={xAxisPath} color="#333333" style="stroke" strokeWidth={2} />

        <Path path={yAxisPath} color="#333333" style="stroke" strokeWidth={2} />

        <Path
          path={linePath}
          color="#000000"
          style="stroke"
          strokeWidth={3}
          strokeCap="round"
          strokeJoin="round"
        />

        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={5}
            color="#000000"
          />
        ))}

        {points.map((point, index) => (
          <Text
            key={`value-${index}`}
            x={point.x - 20}
            y={point.y - 15}
            text={`(${point.xValue},${point.value})`}
            color="#000000"
            font={valueFont}
          />
        ))}

        {yAxisLabels
          .filter(label => label % 10 === 0)
          .map((label, index) => {
            const y =
              CANVAS_HEIGHT -
              PADDING -
              ((label - minValue) / (maxValue - minValue)) * GRAPH_HEIGHT;
            return (
              <Text
                key={`y-label-${index}`}
                x={PADDING - 30}
                y={y + 5}
                text={label.toString()}
                color="#666666"
                font={labelFont}
              />
            );
          })}

        {points.map((point, index) => (
          <Text
            key={`x-label-${index}`}
            x={point.x - 5}
            y={CANVAS_HEIGHT - PADDING + 20}
            text={point.xValue.toString()}
            color="#666666"
            font={labelFont}
          />
        ))}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
});

export default SkiaGraph;
