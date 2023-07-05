import React from "react";
import { View, AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ScreenContainer } from "./src/views/ScreenContainer";
import { NavigationContainer } from "@react-navigation/native";
import { persistStore } from "redux-persist";
import { store } from "./src/store";
import { NativeBaseProvider, extendTheme } from "native-base";

export default function App() {
  const persistor = persistStore(store);

  const theme = extendTheme({
    colors: {
      blue: {
        500: "#00b0ff",
      },
      green: {
        500: "#6ac366",
      },
      red: {
        500: "#ef4444",
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
