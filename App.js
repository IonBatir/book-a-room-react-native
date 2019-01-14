import React from "react";
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
import { createAppContainer } from "react-navigation";
import AppNavigator from "./src/navigation";

const AppContainer = createAppContainer(AppNavigator);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
