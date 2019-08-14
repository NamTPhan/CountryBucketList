import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Keyboard } from "react-native";
import {
  Container,
  Button,
  List,
  ListItem,
  Right,
  Left,
  Body,
  CheckBox,
  Item,
  Input,
  Label
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import * as _ from "lodash";

import { connect } from "react-redux";
import { getBucketListAction } from "../actions/bucketlistActions.js";

class EditBucketList extends Component {
  static navigationOptions = {
    title: "Edit Bucket List"
  };

  constructor(props) {
    super(props);
    this.state = { currentCountry: "", inputIdea: "", items: [], achieved: [] };
  }

  componentDidMount() {
    // Get all countries and their bucketlists data
    this.props.getBucketListAction();
    const allBucketLists = this.props.bucketlistState.bucketlists;

    // Get the passed country name from react navigation
    const { navigation } = this.props;
    const countryName = navigation.getParam("countryName", "No Country Name");

    this.setState({
      currentCountry: countryName
    });

    if (allBucketLists !== undefined) {
      let countryBucketList = _.find(allBucketLists, function(c) {
        return c.country === countryName;
      });

      this.setState({
        items: countryBucketList.items,
        achieved: countryBucketList.achieved
      });
    }
  }

  handleAddItem = () => {
    this.state.items.push(this.state.inputIdea);
    this.state.achieved.push(false);

    this.setState({
      inputIdea: ""
    });

    Keyboard.dismiss();
  };

  handleDeleteItem = index => {
    let itemsArray = this.state.items;
    itemsArray.splice(index, 1);
    let achievedArray = this.state.achieved;
    achievedArray.splice(index, 1);

    this.setState({
      items: itemsArray,
      achieved: achievedArray
    });
  };

  handleCheckBtn = index => {
    let achievedArray = this.state.achieved;
    achievedArray[index] = achievedArray[index] === false ? true : false;

    this.setState({
      achieved: achievedArray
    });
  };

  render() {
    const { inputIdea, items, achieved } = this.state;
    const { navigation } = this.props;
    const countryName = navigation.getParam("countryName", "No Country Name");

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
                  <Input
                    value={inputIdea}
                    onChangeText={text => this.setState({ inputIdea: text })}
                  />
                </Item>
              </View>
              <View style={{ width: "13%" }}>
                <Button
                  style={styles.addBtn}
                  onPress={() => this.handleAddItem()}
                >
                  <Icon style={{ color: "#fff" }} size={20} name="plus" />
                </Button>
              </View>
            </View>

            {items.length > 0 ? (
              <ScrollView>
                {items.map((item, index) => {
                  return (
                    <ListItem key={"item" + index} icon>
                      <Left>
                        <Text>{index + 1}.</Text>
                      </Left>
                      <Body>
                        <Text>{item}</Text>
                      </Body>
                      <Right>
                        <Button
                          transparent
                          onPress={() => this.handleDeleteItem(index)}
                        >
                          <Icon
                            style={styles.trashIcon}
                            size={18}
                            name="trash-o"
                          />
                        </Button>
                        <CheckBox
                          checked={achieved[index]}
                          color="green"
                          onPress={() => this.handleCheckBtn(index)}
                        />
                      </Right>
                    </ListItem>
                  );
                })}
              </ScrollView>
            ) : (
              <View style={styles.centerContent}>
                <Text style={{ fontWeight: "bold" }}>
                  No ideas added yet...
                </Text>
              </View>
            )}
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

const mapDispatchToProps = dispatch => ({
  getBucketListAction: () => dispatch(getBucketListAction())
});

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
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
