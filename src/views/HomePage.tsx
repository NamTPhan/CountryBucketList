import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import { Box, Button, Container } from "native-base";
import * as _ from "lodash";

import Countries from "../data/CountriesFlags.js";
import { SingleListItem } from "../components/SingleListItem";
import { useSelector } from "react-redux";

export const HomePage = ({ navigation }) => {
  const countries = useSelector((state: any) => state.countryState);
  const bucketLists = useSelector((state: any) => state.bucketlistState);
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;
  console.log(countries);
  return (
    <Container>
      <Box
        backgroundColor='blue.500'
        position='absolute'
        width={deviceWidth}
        height={deviceHeight / 2}
      />
      <Box style={styles.overview}>
        <Box style={styles.statsOverview}>
          <Button
            onPress={() =>
              navigation.navigate("Edit Bucket List", {
                countryId: 1,
                countryName: "Netherlands",
              })
            }
          >
            Go to EditBucketListPage
          </Button>
          <Button onPress={() => navigation.navigate("Add Countries")}>
            Go to AddCountries
          </Button>
        </Box>

        <Box style={styles.countriesOverview}>
          <Text>ASD</Text>
        </Box>
      </Box>

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

// class Home extends Component {
//   static navigationOptions = ({ navigation }) => ({
//     title: "Bucket Lists",
//     headerRight: () => (
//       <TouchableOpacity onPress={() => navigation.navigate("AddCountries")}>
//         <Text style={styles.headerBtn}>ADD COUNTRY</Text>
//       </TouchableOpacity>
//     ),
//   });

//   constructor(props) {
//     super(props);
//     props.getAllCountriesAction();
//     props.getBucketListAction();

//     this.state = {
//       defaultCountryList: Countries,
//     };
//   }

//   totalCompleted = bucketlists => {
//     let total = 0;
//     bucketlists.forEach(arr => {
//       arr.achieved.map(item => {
//         if (item) total += 1;
//       });
//     });

//     return total;
//   };
// }

const styles = StyleSheet.create({
  overview: {
    display: "flex",
    flexDirection: "column",
  },
  statsOverview: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    backgroundColor: "blue.500",
    padding: 15,
  },
  countriesOverview: {
    flex: 1,
    flexGrow: 2,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 25,
    paddingHorizontal: 30,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
