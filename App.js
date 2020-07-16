import React from "react";
import { View, AppRegistry, YellowBox } from "react-native";
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
    // TO DO: Waiting for Native Base issue fix, https://github.com/GeekyAnts/NativeBase/issues/3109
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);

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
