import { Dimensions, View } from 'react-native';

const Obstacle = ({
  color,
  obstacleWidth,
  obstacleHeight,
  randomBottom,
  gap,
  obstaclesLeft,
}: {
  color: string;
  obstacleWidth: number;
  obstacleHeight: number;
  randomBottom: number;
  gap: number;
  obstaclesLeft: number;
}) => {
  const screenHeight = Dimensions.get('screen').height;

  return (
    <>
      {/* Bottom obstacle */}
      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: randomBottom,
        }}
      />

      {/* Top obstacle */}
      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstacleWidth,
          height:
            screenHeight -
            obstacleHeight -
            gap -
            randomBottom,
          left: obstaclesLeft,
          top: 0,
        }}
      />
    </>
  );
};

export default Obstacle;