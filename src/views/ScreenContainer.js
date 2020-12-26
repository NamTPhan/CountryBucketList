import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import Home from ".//Home.js";
import AddCountries from "./AddCountries.js";
import EditBucketList from "./EditBucketList.js";

import * as Colors from "../styles/Colors";

const NavigationStack = createStackNavigator(
  {
    Home: Home,
    AddCountries: AddCountries,
    EditBucketList: EditBucketList
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.Blue
      },
      headerTintColor: Colors.White,
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const ScreenContainer = createAppContainer(NavigationStack);

export default ScreenContainer;
