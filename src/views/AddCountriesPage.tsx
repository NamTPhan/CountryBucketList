import React from "react";
import { Dimensions, FlatList, StyleSheet, Image } from "react-native";
import { Box, Button, Container, Text as NBText } from "native-base";

import CountriesList from "../data/CountriesFlags.js";
import { ICountry } from "interfaces/country.interface.js";
import { useDispatch, useSelector } from "react-redux";
import { addCountry, removeCountry } from "../features/countrySlice";

export const AddCountriesPage = () => {
  const deviceWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const countryState = useSelector((state: any) => state.countryState);

  const handleAddCountry = (country: ICountry): void => {
    dispatch(addCountry(country));
  };

  const handleRemoveCountry = (country: ICountry): void => {
    dispatch(removeCountry(country));
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
                  onPress={() => handleRemoveCountry(item)}
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
