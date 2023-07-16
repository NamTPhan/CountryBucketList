import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Text as NBText,
  Pressable,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import * as _ from "lodash";

import CountriesList from "../data/CountriesFlags.js";
import { SingleListItem } from "../components/SingleListItem";
import { useDispatch, useSelector } from "react-redux";

export const HomePage = ({ navigation }) => {
  const dispatch = useDispatch();
  const countryState = useSelector((state: any) => state.countryState);
  const bucketListState = useSelector((state: any) => state.bucketlistState);
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
                Total Accomplished
              </NBText>
            </Flex>
          </Flex>
          <Flex flexDirection='row' my={3}>
            <Flex flex={1} mx={1}>
              <Button
                bg='white.50'
                leftIcon={<Icon name='bars' size={20} color='black' />}
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
                leftIcon={<Icon name='list-ol' size={20} color='black' />}
                _text={{ fontSize: 16, color: "black" }}
                _pressed={{ bg: "gray.200" }}
                opacity={!isCompactView ? 1 : 0.8}
              >
                Detailed View
              </Button>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          flex={1}
          flexGrow={3}
          flexDirection='column'
          style={styles.countriesOverview}
        >
          <Flex flexDirection='row' justifyContent='space-between'>
            <Box>
              <Heading size='md' mb={2} color='blue.500'>
                Country Bucket Lists
              </Heading>
            </Box>

            <Pressable
              onPress={() => navigation.navigate("Add Countries")}
              justifyContent='center'
            >
              <Icon name='plus-circle' size={30} style={{ color: "#9ca3af" }} />
            </Pressable>
          </Flex>

          <FlatList
            data={CountriesList}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.countryListItem]}
                onPress={() =>
                  navigation.navigate("Edit Bucket List", {
                    countryId: 1,
                    countryName: "Netherlands",
                  })
                }
              >
                <Image
                  style={{ width: 60, height: "auto", aspectRatio: 3 / 2 }}
                  source={item.source}
                  alt={item.country}
                />
                <NBText flex={1} flexGrow={4} marginLeft={5} fontSize={18}>
                  {item.country}
                </NBText>
              </Pressable>
            )}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

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
  countryListItem: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 8,
  },
});
