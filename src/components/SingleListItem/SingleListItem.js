import React, { Component } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { ListItem, Body, Left, Right, Icon, Button } from "native-base";

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
            <Text style={styles.flagTitleText}>{this.props.countryName}</Text>
            {this.props.goalsCompleted
              ? `\nAchieved ${this.props.goalsCompleted} / ${
                  this.props.totalGoals
                } Total`
              : null}
          </Text>
        </Body>
        <Right>
          {this.props.actionBtn === "trash" ? (
            <Button transparent>
              <Icon style={{ color: "#d32f2f" }} name="md-trash" />
            </Button>
          ) : null}
          {this.props.actionBtn === "add" ? (
            <Button transparent onPress={this.props.handleOnBtnPress}>
              <Text style={styles.addBtn}>ADD +</Text>
            </Button>
          ) : null}
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
    fontSize: 18
  },
  addBtn: {
    color: "#4CAF50",
    fontWeight: "bold",
    borderColor: "#4CAF50",
    borderWidth: 1,
    padding: 5,
    borderRadius: 20
  }
});
