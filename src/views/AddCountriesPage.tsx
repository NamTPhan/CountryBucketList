import React from "react";
import { Dimensions, FlatList, StyleSheet, Image } from "react-native";
import { Box, Button, Container, Text as NBText } from "native-base";

import CountriesList from "../data/CountriesFlags.js";
import { ICountry } from "../interfaces/country.interface.js";
import { useDispatch, useSelector } from "react-redux";
import { addCountry, removeCountry } from "../features/countrySlice";
import { addBucketList, removeBucketList } from "../features/bucketListSlice";

export const AddCountriesPage = () => {
  const deviceWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const countryState = useSelector((state: any) => state.countryState);

  const handleAddCountry = (countryItem: ICountry): void => {
    const countryName = countryItem.country;
    dispatch(addCountry(countryItem));
    dispatch(
      addBucketList({
        countryId: countryItem.id,
        country: countryName,
        ideas: [],
      })
    );
  };

  const handleRemoveCountry = (countryId: number): void => {
    dispatch(removeCountry(countryId));
    dispatch(removeBucketList(countryId));
  };

  const isCountryAlreadyAdded = (countryId: number): boolean => {
    return countryState.countries.some(
      (country: ICountry) => country.id === countryId
    );
  };

  return (
    <Container>
      <Box display='flex' width={deviceWidth}>
        <FlatList
          data={CountriesList}
          renderItem={({ item }) => (
            <Box style={[styles.card, styles.boxShadow]}>
              <Image
                style={{ width: 60, height: "auto", aspectRatio: 3 / 2 }}
                source={item.source}
                alt={item.country}
              />
              <NBText flex={1} flexGrow={4} marginLeft={5} fontSize={18}>
                {item.country}
              </NBText>
              {!isCountryAlreadyAdded(item.id) && (
                <Button
                  flex={1}
                  colorScheme='green'
                  onPress={() => handleAddCountry(item)}
                >
                  Add
                </Button>
              )}
              {isCountryAlreadyAdded(item.id) && (
                <Button
                  flex={1}
                  colorScheme='red'
                  onPress={() => handleRemoveCountry(item.id)}
                >
                  Remove
                </Button>
              )}
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  boxShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
