import React from "react";
import { StyleSheet, Text, GestureResponderEvent } from "react-native";
import { Box, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

interface SingleListItemProps {
  flag: string;
  country: string;
  actionBtn: string;
  actionBtnRightText: string;
  handleOnPress?: (event: GestureResponderEvent) => void;
  handleOnBtnPress?: (event: GestureResponderEvent) => void;
  handleDeleteBtn?: (event: GestureResponderEvent) => void;
}

export const SingleListItem = ({
  flag,
  actionBtn,
  handleDeleteBtn,
  handleOnPress,
  handleOnBtnPress,
  actionBtnRightText,
  country,
}: SingleListItemProps) => {
  return (
    <Box>
      <div>
        {/* <Image style={{ width: 50 }} resizeMode='contain' source={flag} /> */}
      </div>

      <div style={{ width: "100%" }}>
        <Text style={styles.flagText}>
          <Text style={styles.flagTitleText}>{country}</Text>{" "}
        </Text>
      </div>

      <div>
        {actionBtn === "trash" && (
          <Button onPress={handleDeleteBtn}>
            <Icon size={20} name='trash-o' />
          </Button>
        )}
        {actionBtn === "right" && (
          <Button>
            <Text>{actionBtnRightText} </Text>
            <Icon size={30} name='angle-right' />
          </Button>
        )}
        {actionBtn === "add" && (
          <Button onPress={handleOnBtnPress}>
            <Text style={styles.addBtn}>ADD +</Text>
          </Button>
        )}
      </div>
    </Box>
  );
};

const styles = StyleSheet.create({
  flagText: {
    alignSelf: "flex-start",
    fontSize: 16,
  },

  flagTitleText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  addBtn: {
    // color: Colors.Green,
    fontWeight: "bold",
    // borderColor: Colors.Green,
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
  },
});
