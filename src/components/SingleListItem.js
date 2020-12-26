import React, { Component } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { ListItem, Body, Left, Right, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

import * as Colors from "../styles/Colors";

class SingleListItem extends Component {
  render() {
    return (
      <ListItem icon button onPress={this.props.handleOnPress}>
        <Left>
          <Image
            style={{ width: 50 }}
            resizeMode="contain"
            source={this.props.flag}
          />
        </Left>

        <Body style={{ width: "100%" }}>
          <Text style={styles.flagText}>
            <Text style={styles.flagTitleText}>{this.props.countryName}</Text>{" "}
            {
              this.props.safe === "No" &&
              <Icon style={{ color: Colors.Red }} size={15} name="warning" />
            }
          </Text>
        </Body>

        <Right>
          {this.props.actionBtn === "trash" && (
            <Button transparent onPress={this.props.handleDeleteBtn}>
              <Icon style={{ color: Colors.Red }} size={20} name="trash-o" />
            </Button>
          )}
          {this.props.actionBtn === "right" && (
            <Button transparent>
              <Text style={styles.mainColor}>
                {this.props.actionBtnRightText}{" "}
              </Text>
              <Icon style={styles.mainColor} size={30} name="angle-right" />
            </Button>
          )}
          {this.props.actionBtn === "add" && (
            <Button transparent onPress={this.props.handleOnBtnPress}>
              <Text style={styles.addBtn}>ADD +</Text>
            </Button>
          )}
        </Right>
      </ListItem>
    );
  }
}

export default SingleListItem;

const styles = StyleSheet.create({
  flagText: {
    alignSelf: "flex-start",
    fontSize: 16
  },

  flagTitleText: {
    fontWeight: "bold",
    fontSize: 16
  },

  addBtn: {
    color: Colors.Green,
    fontWeight: "bold",
    borderColor: Colors.Green,
    borderWidth: 1,
    padding: 5,
    borderRadius: 20
  },

  mainColor: {
    color: Colors.Blue
  }
});
