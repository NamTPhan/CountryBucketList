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
  useToast,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { IBucketListIdea } from "../interfaces/bucketlist.interface";
import {
  addBucketListItem,
  removeBucketListItem,
  updateBucketListItemAchievedStatus,
} from "../features/bucketListSlice";
import { Toast } from "../components/Toast";
import { ToastAlertType } from "../constants/Toast";

export const EditBucketListPage = ({ route }) => {
  const dispatch = useDispatch();
  const toast = useToast();
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
      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              type={ToastAlertType.Success}
              message='Successfully added!'
            />
          );
        },
      });
    }
  };

  const removeBucketListIdea = (ideaIndex: number): void => {
    dispatch(
      removeBucketListItem({
        countryId: countryId,
        ideaIndex: ideaIndex,
      })
    );

    toast.show({
      placement: "top",
      render: () => {
        return (
          <Toast
            type={ToastAlertType.Success}
            message='Successfully removed!'
          />
        );
      },
    });
  };

  const updateAchievedStatus = (ideaIndex: number): void => {
    dispatch(
      updateBucketListItemAchievedStatus({
        countryId: countryId,
        ideaIndex: ideaIndex,
      })
    );

    toast.show({
      placement: "top",
      render: () => {
        return <Toast type={ToastAlertType.Success} message='Changes saved!' />;
      },
    });
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
                      <Avatar bg='gray.200' size='sm'>
                        <NBText>{index + 1}</NBText>
                      </Avatar>
                    </Box>
                    <Box flex={1} flexGrow={5}>
                      <NBText fontSize={16}>{item.idea}</NBText>
                    </Box>
                    <Box flex={1} alignItems='flex-end'>
                      <Flex flexDirection='row'>
                        {item.achieved ? (
                          <Icon
                            name='check-square-o'
                            size={24}
                            style={{
                              color: "#4ade80",
                            }}
                            marginRight={15}
                            onPress={() => updateAchievedStatus(index)}
                          />
                        ) : (
                          <Icon
                            name='check-square-o'
                            size={24}
                            style={{
                              color: "#d1d5db",
                            }}
                            marginRight={15}
                            onPress={() => updateAchievedStatus(index)}
                          />
                        )}

                        <Icon
                          style={{ color: "#ef4444" }}
                          size={24}
                          name='trash-o'
                          onPress={() => removeBucketListIdea(index)}
                        />
                      </Flex>
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
