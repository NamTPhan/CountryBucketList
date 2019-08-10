import React, { Component } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { ListItem, Body, Left, Right, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

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
            {"\n"}
            <Icon style={{ color: "#00c853" }} name="check" size={18} />
            {this.props.totalGoals
              ? ` ${this.props.goalsCompleted} / ${this.props.totalGoals}`
              : null}
          </Text>
        </Body>
        <Right>
          {this.props.actionBtn === "right" ? (
            <Button transparent>
              <Icon style={{ color: "#03a9f4" }} size={30} name="angle-right" />
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
