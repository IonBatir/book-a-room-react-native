import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Thumbnail,
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
    fetchItems("review")
      .then(response => {
        this.setState({ loading: false, data: response.reviews });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetchItems("review")
      .then(response => {
        this.setState({ refreshing: false, data: response.reviews });
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
                      {item.review} ~ {item.mark} stars
                    </Text>
                    <Text note>
                      {item.customer} - {item.hotel}
                    </Text>
                  </Body>
                  <Right>
                    <Text note>{item.date}</Text>
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
