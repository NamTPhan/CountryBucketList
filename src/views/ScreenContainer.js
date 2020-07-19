import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import Home from ".//Home.js";
import AddCountries from "./AddCountries.js";
import EditBucketList from "./EditBucketList.js";

const NavigationStack = createStackNavigator(
  {
    Home: Home,
    AddCountries: AddCountries,
    EditBucketList: EditBucketList
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#2196f3"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const ScreenContainer = createAppContainer(NavigationStack);

export default ScreenContainer;
