import React, { useState } from "react";
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
  Pressable,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { IBucketListIdea } from "../interfaces/bucketlist.interface";
import {
  addBucketListItem,
  removeBucketListItem,
} from "../features/bucketListSlice";

export const EditBucketListPage = ({ route }) => {
  const dispatch = useDispatch();
  const bucketListState = useSelector((state: any) => state.bucketlistState);
  const [inputIdea, setInputIdea] = useState("");

  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const { countryId, countryName } = route.params;

  const countryBucketListIdeas = bucketListState.bucketLists.find(
    list => list.countryId === countryId
  );

  const addBucketListIdea = (): void => {
    if (inputIdea.length > 0) {
      dispatch(
        addBucketListItem({
          countryId: countryId,
          newIdea: inputIdea,
        })
      );
      setInputIdea("");
    }
  };

  const removeBucketListIdea = (ideaIndex: number): void => {
    dispatch(
      removeBucketListItem({
        countryId: countryId,
        ideaIndex: ideaIndex,
      })
    );
  };

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
              onChangeText={text => setInputIdea(text)}
              value={inputIdea}
              InputRightElement={
                <Button
                  size='md'
                  rounded='none'
                  w='1/6'
                  colorScheme='green'
                  onPress={() => addBucketListIdea()}
                >
                  Add
                </Button>
              }
            />
          </View>
        </Box>

        <Flex
          flex={1}
          flexGrow={8}
          flexDirection='column'
          style={styles.bucketListItemsOverview}
        >
          {!countryBucketListIdeas?.ideas?.length ? (
            <Center flex={1} alignItems='center'>
              <Text style={{ fontWeight: "bold" }}>
                You have no bucket list ideas added at this moment.
              </Text>
            </Center>
          ) : (
            <FlatList
              data={countryBucketListIdeas?.ideas}
              renderItem={({
                item,
                index,
              }: {
                item: IBucketListIdea;
                index: number;
              }) => (
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
                      <NBText fontSize={16}>{item.idea}</NBText>
                    </Box>
                    <Box flex={1} alignItems='flex-end'>
                      <Icon
                        style={{ color: "#ef4444" }}
                        size={20}
                        name='trash-o'
                        onPress={() => removeBucketListIdea(index)}
                      />
                    </Box>
                  </Flex>
                </Box>
              )}
            />
          )}
        </Flex>
      </Box>
    </Container>
  );
};

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
    width: Dimensions.get("window").width,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 25,
    paddingHorizontal: 30,
  },
});
