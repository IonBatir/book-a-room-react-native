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
import { ROOMS_LIST_SCREEN } from "../const";

const images = [
  "https://s-ec.bstatic.com/images/hotel/max1280x900/101/101430248.jpg",
  "https://t-ec.bstatic.com/images/hotel/max1024x768/921/92138598.jpg",
  "https://t-ec.bstatic.com/images/hotel/max1024x768/718/71884775.jpg",
  "https://t-ec.bstatic.com/images/hotel/max1024x768/718/71884775.jpg",
  "https://t-ec.bstatic.com/images/hotel/max1024x768/116/116050420.jpg",
  "https://s-ec.bstatic.com/images/hotel/max1024x768/150/150921406.jpg",
  "https://s-ec.bstatic.com/images/hotel/max1024x768/102/102481274.jpg"
];

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
    fetchItems("hotel")
      .then(response => {
        this.setState({ loading: false, data: response.hotels });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    fetchItems("hotel")
      .then(response => {
        this.setState({ refreshing: false, data: response.hotels });
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
                <ListItem
                  avatar
                  onPress={() =>
                    this.props.navigation.navigate(ROOMS_LIST_SCREEN, {
                      hotel: item.name
                    })
                  }
                >
                  <Left>
                    <Thumbnail
                      source={{
                        uri: images[Math.floor(Math.random() * images.length)]
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.address}</Text>
                  </Body>
                  <Right>
                    <Text note>{item.nr_stars} stars</Text>
                    <Text note>{item.city}</Text>
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
