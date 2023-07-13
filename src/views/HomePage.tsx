import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text as NBText,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import * as _ from "lodash";

import Countries from "../data/CountriesFlags.js";
import { SingleListItem } from "../components/SingleListItem";
import { useSelector } from "react-redux";

export const HomePage = ({ navigation }) => {
  const countries = useSelector((state: any) => state.countryState);
  const bucketLists = useSelector((state: any) => state.bucketlistState);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  const [isCompactView, setIsCompactView] = useState(true);

  return (
    <Container>
      <Box
        backgroundColor='blue.500'
        position='absolute'
        width={deviceWidth}
        height={deviceHeight / 2}
      />
      <Flex flexDirection='column'>
        <Flex flex={1} flexDirection='column' style={styles.statsOverview}>
          <Flex flexDirection='row'>
            <Flex flex={1} style={styles.infoCard}>
              <Avatar bg='orange.400' size='55px'>
                10
              </Avatar>
              <NBText fontSize={16} mt={2}>
                Total Bucket Lists
              </NBText>
            </Flex>
            <Flex flex={1} style={styles.infoCard}>
              <Avatar bg='green.400' size='55px'>
                26/42
              </Avatar>
              <NBText fontSize={16} mt={2}>
                Accomplished
              </NBText>
            </Flex>
          </Flex>
          <Flex flexDirection='row' my={5}>
            <Flex flex={1} mx={1}>
              <Button
                bg='white.50'
                leftIcon={<Icon name='bars' size='20' color='black' />}
                _text={{ fontSize: 16, color: "black" }}
                _pressed={{ bg: "gray.200" }}
                opacity={isCompactView ? 1 : 0.8}
              >
                Compact View
              </Button>
            </Flex>
            <Flex flex={1} mx={1}>
              <Button
                bg='white.50'
                colorScheme='white'
                leftIcon={<Icon name='list-ol' size='20' color='black' />}
                _text={{ fontSize: 16, color: "black" }}
                _pressed={{ bg: "gray.200" }}
                opacity={!isCompactView ? 1 : 0.8}
              >
                Detailed View
              </Button>
            </Flex>
          </Flex>

          <Center>
            <Button
              variant='solid'
              leftIcon={<Icon name='plus' size='20' color='black' />}
              _text={{ fontSize: 16, color: "black" }}
              _pressed={{ bg: "yellow.200" }}
              borderRadius={50}
              bg='yellow.300'
              width={deviceWidth / 2}
              onPress={() => navigation.navigate("Add Countries")}
            >
              Country
            </Button>
          </Center>
          {/* 
            onPress={() =>
              navigation.navigate("Edit Bucket List", {
                countryId: 1,
                countryName: "Netherlands",
              })
            }*/}
        </Flex>

        <Flex
          flex={1}
          flexGrow={2}
          flexDirection='column'
          style={styles.countriesOverview}
        >
          <NBText>ASD</NBText>
        </Flex>
      </Flex>

      {/* {
        countryState?.addedCountries.length > 0 ? (
        <ScrollView>
          {countryState.addedCountries.map((item, index) => {
            return (
              <SingleListItem
                key={"Country" + index}
                countryName={item}
                flag={defaultCountryList.find(c => c.country === item).source}
                safe={defaultCountryList.find(c => c.country === item).safe}
                actionBtn='right'
                actionBtnRightText='Edit'
                handleOnPress={() => this.props.navigation.navigate("EditBucketList", {
                  countryName: item,
                })} />
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.centerContent}>
          <Text style={{ fontWeight: "bold" }}>No countries added</Text>
        </View>
      )}
        {
          countryState?.addedCountries.length > 0 ? (
          <ScrollView>
            <Card style={styles.cardOverallInfo}>
              <CardItem>
                <Body>
                  <Text style={{ alignSelf: "center" }}>
                    <Icon
                      style={{ color: Colors.Green }}
                      size={18}
                      name='check-circle' />{" "}
                    Completed{" "}
                    {this.totalCompleted(bucketlistState.bucketlists)}
                    {" of "}
                    {Object.values(bucketlistState.bucketlists).reduce(
                      (e, { items }) => e + items.length,
                      0
                    )}
                    {" ideas"}
                  </Text>
                </Body>
              </CardItem>
            </Card>
            {
              bucketlistState.bucketlists.map((item, index) => {
                return (
                  <Card
                    key={"countryCard" + index}
                    style={styles.cardStyle}
                  >
                    <CardItem>
                      <Body>
                        <View style={styles.cardTitle}>
                          <Image
                            style={{ width: 40 }}
                            resizeMode='contain'
                            source={defaultCountryList.find(
                              c => c.country === item.country
                            ).source} />
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "bold",
                              textAlignVertical: "center",
                            }}
                          >
                            {" "}
                            {item.country}
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                          }}
                        >
                          {item.items.map((idea, index) => {
                            return (
                              <View key={"idea" + index}>
                                <Text>
                                  {item.achieved[index] ? (
                                    <Icon
                                      style={{ color: Colors.Green }}
                                      size={18}
                                      name='check-circle' />
                                  ) : (
                                    <Icon
                                      style={{ color: Colors.Blue }}
                                      size={15}
                                      name='ellipsis-h' />
                                  )}{" "}
                                  {idea}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </Body>
                    </CardItem>
                  </Card>
                );
              })}
          </ScrollView>
        ) : (
          <View style={styles.centerContent}>
            <Text style={{ fontWeight: "bold" }}>No countries added</Text>
          </View>
        )} */}
    </Container>
  );
};

//   totalCompleted = bucketlists => {
//     let total = 0;
//     bucketlists.forEach(arr => {
//       arr.achieved.map(item => {
//         if (item) total += 1;
//       });
//     });

//     return total;
//   };

const styles = StyleSheet.create({
  statsOverview: {
    width: Dimensions.get("window").width,
    backgroundColor: "blue.500",
    padding: 15,
  },
  countriesOverview: {
    width: Dimensions.get("window").width,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 25,
    paddingHorizontal: 30,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
});
