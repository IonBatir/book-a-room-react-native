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
import { fetchItems } from "../api";

export default class extends React.Component {
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
        console.log(response.rooms);
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
    const { data, loading } = this.state;
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
              dataArray={data}
              renderRow={item => (
                <ListItem>
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
