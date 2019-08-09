import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  AsyncStorage
} from "react-native";
import { name as appName } from "./app.json";

import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Container, Content, Spinner } from "native-base";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persist from "./src/store";

import ScreenContainer from "./src/views/ScreenContainer";

const persistStore = persist();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    // AsyncStorage.removeItem("ADDED_COUNTRIES");
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
        <Provider store={persistStore.store}>
          <PersistGate loading={null} persistor={persistStore.persistor}>
            <ScreenContainer />
          </PersistGate>
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
