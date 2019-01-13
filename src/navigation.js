import React from "react";
import { Icon } from "native-base";
import { createBottomTabNavigator } from "react-navigation";
import { Hotels, Rooms, Reviews } from "./screens";
import { HOTELS_SCREEN, ROOMS_SCREEN, REVIEWS_SCREEN } from "./const";

export default createBottomTabNavigator(
  {
    [HOTELS_SCREEN]: {
      screen: Hotels,
      navigationOptions: {
        tabBarLabel: "Hotels",
        tabBarIcon: <Icon name="building" type="FontAwesome" />
      }
    },
    [ROOMS_SCREEN]: {
      screen: Rooms,
      navigationOptions: {
        tabBarLabel: "Rooms",
        tabBarIcon: <Icon name="hotel" type="MaterialIcons" />
      }
    },
    [REVIEWS_SCREEN]: {
      screen: Reviews,
      navigationOptions: {
        tabBarLabel: "Reviews",
        tabBarIcon: <Icon name="rate-review" type="MaterialIcons" />
      }
    }
  },
  {
    initialRouteName: HOTELS_SCREEN
  }
);
