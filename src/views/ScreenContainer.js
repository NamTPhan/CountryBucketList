import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";

import { HomePage } from "./HomePage";
import { AddCountriesPage } from "./AddCountriesPage";
import { EditBucketListPage } from "./EditBucketListPage";

import * as Colors from "../styles/Colors";

const NavigationStack = createStackNavigator(
  {
    Home: HomePage,
    AddCountries: AddCountriesPage,
    EditBucketList: EditBucketListPage
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
