import React from "react";
import { View, AppRegistry, YellowBox } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import ScreenContainer from "./src/views/ScreenContainer";
import { NavigationContainer } from "@react-navigation/native";
import { persistStore } from "redux-persist";
import { store } from "./src/store";
import { NativeBaseProvider } from "native-base";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  // async componentDidMount() {
  //   // TO DO: Waiting for Native Base issue fix, https://github.com/GeekyAnts/NativeBase/issues/3109
  //   YellowBox.ignoreWarnings(["Animated: `useNativeDriver`"]);

  //   await Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //     ...Ionicons.font,
  //   });
  //   this.setState({ isReady: true });
  // }

  render() {
    const persistor = persistStore(store);

    return (
      <NavigationContainer>
        <NativeBaseProvider>
          <View style={{ flex: 1 }}>
            <Provider store={store}>
              <PersistGate persistor={persistor}>
                <ScreenContainer />
              </PersistGate>
            </Provider>
          </View>
        </NativeBaseProvider>
      </NavigationContainer>
    );
  }
}

AppRegistry.registerComponent("Country BucketList", () => App);
