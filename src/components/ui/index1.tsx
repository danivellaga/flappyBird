import { useEffect, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import Bird from '../../components/Bird';
import Obstacle from '../../components/Obstacle';

export default function HomeScreen() {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  const [birdBottom, setBirdBottom] = useState(
    screenHeight / 2
  );

  const birdLeft = screenWidth / 2;

  const [score, setScore] = useState(0);

  const gravity = 3;

  const obstacleWidth = 90;
  const obstacleHeight = 300;

  const [obstaclesLeft, setObstaclesLeft] =
    useState(screenWidth);

  const [obstaclesLeftTwo, setObstaclesLeftTwo] =
    useState(screenWidth + screenWidth / 2);

  const [obstaclesHeight, setObstaclesHeight] =
    useState(200);

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

    if (obstaclesLeft > -obstacleWidth) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(
          (obstaclesLeft) => obstaclesLeft - 5
        );
      }, 30);
    } else {
      setObstaclesLeft(screenWidth);

      setObstaclesHeight(
        Math.random() * 100 + 100
      );
    }

    return () => {
      clearInterval(obstaclesTimerId);
    };
  }, [obstaclesLeft]);

  // Second obstacle
  useEffect(() => {
    let obstaclesTimerIdTwo: NodeJS.Timeout;

    if (obstaclesLeftTwo > -obstacleWidth) {
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

  // Jump
  const jump = () => {
    setBirdBottom(
      (birdBottom) => birdBottom + 50
    );
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          resizeMode="cover"
          style={styles.background}
        >
          <Text style={styles.score}>
            Score: {score}
          </Text>

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
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  score: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    zIndex: 10,
  },
});