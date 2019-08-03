import React, { Component } from "react";
import { StyleSheet, AppRegistry, Text, View } from "react-native";
import { Container, Button, Fab, Icon } from "native-base";

class EditBucketList extends Component {
  static navigationOptions = {
    title: "Edit Bucket List"
  };

  render() {
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Fab
            containerStyle={{}}
            style={{ backgroundColor: "#2196F3" }}
            position="bottomRight"
            onPress={() => alert("Yes")}
          >
            <Icon name="ios-add" />
          </Fab>
        </View>
      </Container>
    );
  }
}

export default EditBucketList;

const styles = StyleSheet.create({
  flag: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});
