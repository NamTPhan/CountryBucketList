import React from "react";
import { Dimensions, FlatList, StyleSheet, Image } from "react-native";
import { Box, Button, Container, Text as NBText } from "native-base";

import CountriesList from "../data/CountriesFlags.js";

export const AddCountriesPage = () => {
  const deviceWidth = Dimensions.get("window").width;

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
              <Button flex={1} colorScheme='green'>
                Add
              </Button>
              {/* <Button flex={1} colorScheme='red'>
                Remove
              </Button> */}
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
