import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  let [fontsLoaded] = useFonts({
    "spoqa-hans": require("./assets/fonts/SpoqaHanSansNeo-Regular.ttf"),
  });

  const handleNewGame = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const handleGameOver = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  if (!fontsLoaded) return <AppLoading />;
  else {
    console.log(fontsLoaded);
    let content = <StartGameScreen onStartGame={handleStartGame} />;

    if (userNumber && guessRounds <= 0) {
      content = (
        <GameScreen userChoice={userNumber} onGameOver={handleGameOver} />
      );
    } else if (guessRounds > 0) {
      content = (
        <GameOverScreen
          roundsNumber={guessRounds}
          userNumber={userNumber}
          onRestart={handleNewGame}
        />
      );
    }

    return (
      <View style={styles.screen}>
        <Header title="Guess A Number" />
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
