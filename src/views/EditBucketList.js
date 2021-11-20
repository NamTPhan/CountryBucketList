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
  Label,
  Toast,
  Root,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import * as _ from "lodash";

import { connect } from "react-redux";
import {
  saveBucketListAction,
  getBucketListAction,
} from "../actions/bucketlistActions.js";

import * as Colors from "../styles/Colors";

class EditBucketList extends Component {
  static navigationOptions = {
    title: "Edit Bucket List",
  };

  _isMounted = false;

  constructor (props) {
    super(props);

    this.state = {
      currentCountry: "",
      inputIdea: "",
      items: [],
      achieved: [],
      indexOfCountry: "",
    };
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state, callback) => {
      return;
    };
  }

  componentDidMount() {
    this._isMounted = true;
    // Get all countries and their bucketlists data
    this.props.getBucketListAction();

    setTimeout(() => {
      const allBucketLists = this.props.bucketlistState.bucketlists;

      // Get the passed country name from react navigation
      const { navigation } = this.props;
      const countryName = navigation.getParam("countryName", "No Country Name");

      this.setState({
        currentCountry: countryName,
      });

      if (allBucketLists !== undefined && allBucketLists.length > 0) {
        let countryBucketList = _.find(allBucketLists, function (c) {
          return c.country === countryName;
        });

        let indexOfCountryBucketList = _.findIndex(allBucketLists, function (
          c
        ) {
          return c.country === countryName;
        });

        this.setState({
          items: countryBucketList.items,
          achieved: countryBucketList.achieved,
          indexOfCountry: indexOfCountryBucketList,
        });
      }
    }, 1000);
  }

  onChangeIdeaInput = (text) => {
    this.setState({ inputIdea: text });
  };

  handleAddItem = () => {
    this.state.items.push(this.state.inputIdea);
    this.state.achieved.push(false);

    this.setState({
      inputIdea: "",
    });

    Keyboard.dismiss();
  };

  handleDeleteItem = (index) => {
    let itemsArray = this.state.items;
    itemsArray.splice(index, 1);
    let achievedArray = this.state.achieved;
    achievedArray.splice(index, 1);

    this.setState({
      items: itemsArray,
      achieved: achievedArray,
    });
  };

  handleCheckBtn = (index) => {
    let achievedArray = this.state.achieved;
    achievedArray[index] = achievedArray[index] === false ? true : false;

    this.setState({
      achieved: achievedArray,
    });
  };

  toastMessage = (text, type) => {
    Toast.show({
      text: text,
      duration: 3000,
      type: type,
      position: "bottom",
    });
  };

  render() {
    const { inputIdea, items, achieved, indexOfCountry } = this.state;
    const { navigation } = this.props;
    const countryName = navigation.getParam("countryName", "No Country Name");

    return (
      <Container>
        <Root>
          <View style={{ flex: 3 }}>
            <List>
              <ListItem itemDivider style={{ backgroundColor: Colors.WhiteSmoke }}>
                <Text style={styles.countryName}>{countryName}</Text>
              </ListItem>

              <View style={styles.inputFieldView}>
                <View style={{ flex: 1, flexGrow: 7 }}>
                  <Item inlineLabel>
                    <Label>Idea:</Label>
                    <Input
                      value={inputIdea}
                      onChangeText={(text) => this.onChangeIdeaInput(text)}
                    />
                  </Item>
                </View>
                <View style={{ flex: 1 }}>
                  <Button
                    style={styles.addBtn}
                    onPress={() => this.handleAddItem()}
                  >
                    <Icon
                      style={{
                        color: Colors.White,
                        width: 50,
                        textAlign: 'center'
                      }}
                      size={20}
                      name="plus"
                    />
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
                      {"\n"}No ideas added...
                  </Text>
                  </View>
                )}
            </List>
          </View>

          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <Button
              block
              success
              onPress={() => {
                this.props.saveBucketListAction(indexOfCountry, {
                  country: countryName,
                  items: items,
                  achieved: achieved,
                });
                this.toastMessage("Changes successfully saved!", "success");
              }}
            >
              <Text style={{ color: Colors.White, fontWeight: "bold" }}>
                Save Changes
              </Text>
            </Button>
          </View>
        </Root>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  saveBucketListAction: (index, object) =>
    dispatch(saveBucketListAction(index, object)),

  getBucketListAction: () => dispatch(getBucketListAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBucketList);

const styles = StyleSheet.create({
  trashIcon: {
    color: Colors.Red,
    marginRight: 10,
  },
  countryName: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  addBtn: {
    backgroundColor: Colors.Blue,
    justifyContent: "center"
  },
  inputFieldView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
