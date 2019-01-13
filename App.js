import React from "react";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./src/navigation";

const AppContainer = createAppContainer(AppNavigator);

export default () => <AppContainer />;
