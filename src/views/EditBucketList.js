import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {
  Container,
  Button,
  List,
  ListItem,
  Right,
  Left,
  Body,
  Switch,
  Item,
  Input,
  Label
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";

class EditBucketList extends Component {
  static navigationOptions = {
    title: "Edit Bucket List"
  };

  constructor(props) {
    super(props);
    this.state = { inputIdea: "Bucket List Idea" };
  }

  render() {
    const { inputIdea } = this.state;
    const { navigation } = this.props;
    const countryName = navigation.getParam("countryName", "Undefined");

    return (
      <Container>
        <View style={{ flex: 3 }}>
          <List>
            <ListItem itemDivider style={{ backgroundColor: "#f5f5f5" }}>
              <Text style={styles.countryName}>{countryName}</Text>
            </ListItem>

            <View style={styles.inputFieldView}>
              <View style={{ width: "87%" }}>
                <Item floatingLabel>
                  <Label>Bucket List Idea</Label>
                  <Input />
                </Item>
              </View>
              <View style={{ width: "13%" }}>
                <Button style={styles.addBtn} onPress={() => alert("test")}>
                  <Icon style={{ color: "#fff" }} size={20} name="plus" />
                </Button>
              </View>
            </View>

            <ScrollView>
              <ListItem icon>
                <Left>
                  <Text>1.</Text>
                </Left>
                <Body>
                  <Text>Airplane Mode</Text>
                </Body>
                <Right>
                  <Icon style={styles.trashIcon} size={18} name="trash-o" />
                  <Switch value={false} />
                </Right>
              </ListItem>
            </ScrollView>
          </List>
        </View>

        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Button block success>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Save Changes
            </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditBucketList);

const styles = StyleSheet.create({
  trashIcon: {
    color: "#ff0000",
    marginRight: 10
  },
  countryName: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1
  },
  addBtn: {
    backgroundColor: "#2196f3",
    justifyContent: "center"
  },
  inputFieldView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10
  }
});
