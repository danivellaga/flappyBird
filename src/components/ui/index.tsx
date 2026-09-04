import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Bird from '../../components/Bird';
import Obstacle from '../../components/Obstacle';

export default function HomeScreen() {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  const birdLeft = screenWidth / 2;

  const [birdBottom, setBirdBottom] = useState(
    screenHeight / 2
  );

  const gravity = 3;

  const obstacleWidth = 60;
  const obstacleHeight = 300;

  const [obstaclesLeft, setObstaclesLeft] =
    useState(screenWidth);

  const [obstaclesLeftTwo, setObstaclesLeftTwo] =
    useState(screenWidth + screenWidth / 2);

  const [obstaclesHeight] = useState(200);

  const [obstaclesHeightTwo, setObstaclesHeightTwo] =
    useState(150);

  const gap = 150;

  // Bird falling
  useEffect(() => {
    let gameTimerId: NodeJS.Timeout;

    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(
          (birdBottom) => birdBottom - gravity
        );
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom]);

  // First obstacle
  useEffect(() => {
    let obstaclesTimerId: NodeJS.Timeout;

    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(
          (obstaclesLeft) => obstaclesLeft - 5
        );
      }, 30);
    } else {
      setObstaclesLeft(screenWidth);
    }

    return () => {
      clearInterval(obstaclesTimerId);
    };
  }, [obstaclesLeft]);

  // Second obstacle
  useEffect(() => {
    let obstaclesTimerIdTwo: NodeJS.Timeout;

    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(
          (obstaclesLeftTwo) => obstaclesLeftTwo - 5
        );
      }, 30);
    } else {
      setObstaclesLeftTwo(screenWidth);

      setObstaclesHeightTwo(
        Math.random() * 100 + 100
      );
    }

    return () => {
      clearInterval(obstaclesTimerIdTwo);
    };
  }, [obstaclesLeftTwo]);

  return (
    <View style={styles.container}>
      <Bird
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />

      <Obstacle
        color="green"
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        randomBottom={obstaclesHeight}
        gap={gap}
        obstaclesLeft={obstaclesLeft}
      />

      <Obstacle
        color="yellow"
        obstacleWidth={obstacleWidth}
        obstacleHeight={obstacleHeight}
        randomBottom={obstaclesHeightTwo}
        gap={gap}
        obstaclesLeft={obstaclesLeftTwo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});