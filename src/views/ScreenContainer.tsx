import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomePage } from "./HomePage";
import { AddCountriesPage } from "./AddCountriesPage";
import { EditBucketListPage } from "./EditBucketListPage";

export const ScreenContainer = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Group
          screenOptions={{
            headerStyle: {
              backgroundColor: "#00b0ff",
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name='Home' component={HomePage} />
          <Stack.Screen name='Add Countries' component={AddCountriesPage} />
          <Stack.Screen
            name='Edit Bucket List'
            component={EditBucketListPage}
          />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};
