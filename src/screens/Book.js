import React from "react";
import {
  Container,
  H1,
  H3,
  Content,
  Button,
  Item,
  Form,
  Text,
  Toast,
  DatePicker
} from "native-base";
import { addItem } from "../api";
import { HOTELS_SCREEN } from "../const";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      check_in: "",
      check_out: ""
    };
  }

  setDate = name => date => this.setState({ [name]: date });

  render() {
    const { navigation } = this.props,
      { check_in, check_out } = this.state,
      room = navigation.getParam("room");
    return (
      <Container
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#FFF"
        }}
      >
        <Content>
          <H1
            style={{
              textAlign: "center",
              marginTop: 100
            }}
          >
            Book room {room.number}
          </H1>
          <H3
            style={{
              textAlign: "center",
              marginTop: 10
            }}
          >
            {room.hotel}
          </H3>
          <Form>
            <Item>
              <DatePicker
                modalTransparent={false}
                minimumDate={new Date()}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="CheckIn"
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate("check_in")}
              />
            </Item>
            <Item>
              <DatePicker
                modalTransparent={false}
                minimumDate={new Date()}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="CheckOut"
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate("check_out")}
              />
            </Item>
          </Form>
          <Button
            onPress={() => {
              const date = new Date();
              addItem("booking", {
                customer_id: "7dcceb32-794a-4190-b3dc-1558344f1a34",
                room_id: room.id,
                date: `${date.getFullYear()}-${date.getMonth() +
                  1}-${date.getDate()}`,
                check_in: `${check_in.getFullYear()}-${check_in.getMonth() +
                  1}-${check_in.getDate()}`,
                check_out: `${check_out.getFullYear()}-${check_out.getMonth() +
                  1}-${check_out.getDate()}`
              })
                .then(response => {
                  navigation.navigate(HOTELS_SCREEN);
                })
                .catch(error => {
                  console.log(error);
                });
            }}
            block
            style={{ margin: 15, marginTop: 50 }}
          >
            <Text>Book this room</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
