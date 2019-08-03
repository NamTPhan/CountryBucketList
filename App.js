import React from "react";
import { name as appName } from "./app.json";  
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { Container, Content, Spinner } from "native-base";

import { Provider } from "react-redux";

import configureStore from "./src/store";
import ScreenContainer from "./src/views/ScreenContainer";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <Container>
          <Content>
            <Spinner color="blue" />
          </Content>
        </Container>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Provider store={configureStore()}>
          <ScreenContainer />
        </Provider>
      </View>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
