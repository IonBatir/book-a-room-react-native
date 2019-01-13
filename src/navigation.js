import { createBottomTabNavigator } from "react-navigation";
import { Hotels, Rooms, Reviews } from "./screens";
import { HOTELS_SCREEN, ROOMS_SCREEN, REVIEWS_SCREEN } from "./const";

export default createBottomTabNavigator(
  {
    [HOTELS_SCREEN]: {
      screen: Hotels,
      navigationOptions: {
        tabBarLabel: "Hotels"
      }
    },
    [ROOMS_SCREEN]: {
      screen: Rooms,
      navigationOptions: {
        tabBarLabel: "Rooms"
      }
    },
    [REVIEWS_SCREEN]: {
      screen: Reviews,
      navigationOptions: {
        tabBarLabel: "Reviews"
      }
    }
  },

  {
    initialRouteName: HOTELS_SCREEN
  }
);
