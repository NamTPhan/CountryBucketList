import React from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import {
  Avatar,
  Box,
  Button,
  Container,
  Input,
  Text as NBText,
  Flex,
  Center,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import * as _ from "lodash";

export const EditBucketListPage = ({ route }) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const { countryName } = route.params;

  return (
    <Container>
      <Box
        backgroundColor='blue.500'
        position='absolute'
        width={deviceWidth}
        height={deviceHeight / 2}
      />
      <Box style={styles.editBucketListOverview}>
        <Box>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
              color: "#ffffff",
            }}
          >
            {countryName ?? "No Country Selected"}
          </Text>
        </Box>
        <Box style={styles.inputContainer}>
          <View>
            <Input
              variant='rounded'
              backgroundColor='white.50'
              placeholder='Example: Go on a road trip...'
              onChangeText={text => console.log(text)}
              InputRightElement={
                <Button
                  size='md'
                  rounded='none'
                  w='1/6'
                  colorScheme='green'
                  onPress={() => console.log("add idea")}
                >
                  Add
                </Button>
              }
            />
          </View>
        </Box>

        <Box style={styles.bucketListItemsOverview}>
          {/* <Center marginTop={25}>
            <Text style={{ fontWeight: "bold" }}>
              You have no bucket list ideas added at this moment.
            </Text>
          </Center> */}
          <FlatList
            data={[
              { key: "Devin" },
              { key: "Dan" },
              {
                key: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni",
              },
              { key: "Jackson" },
              { key: "James" },
              { key: "Joel" },
              { key: "John" },
              { key: "Jillian" },
              { key: "Jimmy" },
              { key: "Julie" },
            ]}
            renderItem={({ item, index }) => (
              <Box
                borderBottomWidth='0.2'
                borderColor='grey.500'
                pl={["0", "4"]}
                pr={["0", "5"]}
                py='2'
              >
                <Flex flexDirection='row'>
                  <Box flex={1}>
                    <Avatar bg='gray.300' size='40px'>
                      {index + 1}
                    </Avatar>
                  </Box>
                  <Box flex={1} flexGrow={5}>
                    <NBText>{item.key}</NBText>
                  </Box>
                  <Box flex={1} alignItems='flex-end'>
                    <NBText fontSize='md'>
                      <Icon
                        style={{ color: "#ef4444" }}
                        size={20}
                        name='trash-o'
                      />
                    </NBText>
                  </Box>
                </Flex>
              </Box>
            )}
          />
        </Box>
      </Box>
    </Container>
  );
};

//   handleDeleteItem = index => {
//     let itemsArray = this.state.items;
//     itemsArray.splice(index, 1);
//     let achievedArray = this.state.achieved;
//     achievedArray.splice(index, 1);

//     this.setState({
//       items: itemsArray,
//       achieved: achievedArray,
//     });
//   };

//   handleCheckBtn = index => {
//     let achievedArray = this.state.achieved;
//     achievedArray[index] = achievedArray[index] === false ? true : false;

//     this.setState({
//       achieved: achievedArray,
//     });
//   };

const styles = StyleSheet.create({
  editBucketListOverview: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    backgroundColor: "blue.500",
    padding: 15,
  },
  bucketListItemsOverview: {
    flex: 1,
    flexGrow: 8,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 25,
    paddingHorizontal: 30,
  },
});
