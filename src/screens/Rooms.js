import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Right,
  Body,
  Text,
  Spinner
} from "native-base";
import { createStackNavigator } from "react-navigation";
import Book from "./Book";
import { BOOK_SCREEN, ROOMS_LIST_SCREEN } from "../const";
import { fetchItems } from "../api";

class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      data: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetchItems("room")
      .then(response => {
        this.setState({ loading: false, data: response.rooms });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetchItems("room")
      .then(response => {
        this.setState({ refreshing: false, data: response.rooms });
      })
      .catch(error => {
        this.setState({ refreshing: false });
        console.log(error);
      });
  };

  render() {
    const { data, loading } = this.state,
      { navigation } = this.props,
      hotel = navigation.getParam("hotel");
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <Container>
          <Header />
          <Content>
            <List
              dataArray={
                hotel ? data.filter(item => item.hotel === hotel) : data
              }
              renderRow={item => (
                <ListItem
                  onPress={() =>
                    navigation.navigate(BOOK_SCREEN, { room: item })
                  }
                >
                  <Body>
                    <Text>
                      Nr. {item.number} ({item.type})
                    </Text>
                    <Text note>{item.hotel}</Text>
                  </Body>
                  <Right>
                    <Text>{item.price_per_day}$</Text>
                  </Right>
                </ListItem>
              )}
            />
            {loading && <Spinner />}
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default createStackNavigator(
  {
    [ROOMS_LIST_SCREEN]: Rooms,
    [BOOK_SCREEN]: Book
  },
  { initialRouteName: ROOMS_LIST_SCREEN, headerMode: "none" }
);
