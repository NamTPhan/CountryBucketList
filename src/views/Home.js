import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Image,
} from "react-native";
import {
  Container,
  Content,
  Spinner,
  Tab,
  Tabs,
  TabHeading,
  Card,
  CardItem,
  Body,
} from "native-base";
import * as _ from "lodash";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";

import Countries from "../data/CountriesFlags.js";
import SingleListItem from "../components/SingleListItem.js";

import { getAllCountriesAction } from "../actions/countryActions.js";
import { getBucketListAction } from "../actions/bucketlistActions.js";

import * as Colors from "../styles/Colors";
class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Bucket Lists",
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("AddCountries")}>
        <Text style={styles.headerBtn}>ADD COUNTRY</Text>
      </TouchableOpacity>
    ),
  });

  constructor (props) {
    super(props);
    props.getAllCountriesAction();
    props.getBucketListAction();

    this.state = {
      defaultCountryList: Countries,
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  totalCompleted = (bucketlists) => {
    let total = 0;
    bucketlists.forEach((arr) => {
      arr.achieved.map((item) => {
        if (item) total += 1;
      });
    });

    return total;
  };

  render() {
    const { defaultCountryList, loading } = this.state;
    const { countryState, bucketlistState } = this.props;

    if (loading) {
      return (
        <Container>
          <Content>
            <Spinner color="blue" />
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Tabs>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: Colors.Blue }}>
                <Text style={{ color: Colors.White }}>OVERVIEW</Text>
              </TabHeading>
            }
          >
            {countryState.addedCountries &&
              countryState.addedCountries.length > 0 ? (
                <ScrollView>
                  <Card style={styles.cardOverallInfo}>
                    <CardItem>
                      <Body>
                        <Text style={{ alignSelf: "center" }}>
                          <Icon
                            style={{ color: Colors.Red }}
                            size={15}
                            name="warning"
                          />{" "}
                        Travel Advisory: Do Not Travel
                      </Text>
                      </Body>
                    </CardItem>
                  </Card>
                  {
                    countryState.addedCountries.map((item, index) => {
                      return (
                        <SingleListItem
                          key={"Country" + index}
                          countryName={item}
                          flag={
                            defaultCountryList.find((c) => c.country === item)
                              .source
                          }
                          safe={
                            defaultCountryList.find((c) => c.country === item).safe
                          }
                          actionBtn="right"
                          actionBtnRightText="Edit"
                          handleOnPress={() =>
                            this.props.navigation.navigate("EditBucketList", {
                              countryName: item,
                            })
                          }
                        />
                      );
                    })
                  }
                </ScrollView>
              ) : (
                <View style={styles.centerContent}>
                  <Text style={{ fontWeight: "bold" }}>No countries added</Text>
                </View>
              )}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: Colors.Blue }}>
                <Text style={{ color: Colors.White }}>DETAILS</Text>
              </TabHeading>
            }
          >
            {countryState.addedCountries &&
              countryState.addedCountries.length > 0 ? (
                <ScrollView>
                  <Card style={styles.cardOverallInfo}>
                    <CardItem>
                      <Body>
                        <Text style={{ alignSelf: "center" }}>
                          <Icon
                            style={{ color: Colors.Green }}
                            size={18}
                            name="check-circle"
                          />{" "}
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
                  {bucketlistState.bucketlists &&
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
                                  resizeMode="contain"
                                  source={
                                    defaultCountryList.find(
                                      (c) => c.country === item.country
                                    ).source
                                  }
                                />
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
                                            name="check-circle"
                                          />
                                        ) : (
                                            <Icon
                                              style={{ color: Colors.Blue }}
                                              size={15}
                                              name="ellipsis-h"
                                            />
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
              )}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  getBucketListAction: () => dispatch(getBucketListAction()),
  getAllCountriesAction: () => dispatch(getAllCountriesAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  flag: {
    flex: 1,
  },
  headerBtn: {
    color: Colors.White,
    fontWeight: "bold",
    marginRight: 5,
    borderColor: Colors.White,
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
  },
  cardOverallInfo: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.Blue,
  },
  cardStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
