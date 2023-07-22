import React from "react";
import { View, AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ScreenContainer } from "./src/views/ScreenContainer";
import { NavigationContainer } from "@react-navigation/native";
import { persistStore } from "redux-persist";
import { store } from "./src/features/store";
import { NativeBaseProvider, extendTheme } from "native-base";

export default function App() {
  const persistor = persistStore(store);

  const theme = extendTheme({
    colors: {
      blue: {
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#00b0ff",
      },
      green: {
        300: "#86efac",
        400: "#4ade80",
        500: "#6ac366",
      },
      red: {
        500: "#ef4444",
      },
      yellow: {
        200: "#fef08a",
        300: "#fde047",
      },
      orange: {
        300: "#fdba74",
        400: "#fb923c",
      },
      white: {
        50: "#ffffff",
      },
      gray: {
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
      },
    },
  });

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
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

AppRegistry.registerComponent("Country BucketList", () => App);
