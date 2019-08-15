import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Image
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
  Body
} from "native-base";
import * as _ from "lodash";
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";

import Countries from "../data/CountriesFlags.js";
import SingleListItem from "../components/SingleListItem/SingleListItem.js";

import { getAllCountriesAction } from "../actions/countryActions.js";
import { getBucketListAction } from "../actions/bucketlistActions.js";

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Bucket Lists",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("AddCountries")}>
        <Text style={styles.headerBtn}>ADD COUNTRY</Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      defaultCountryList: Countries,
      loading: true
    };
  }

  componentWillMount() {
    this.props.getAllCountriesAction();
    this.props.getBucketListAction();
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1000);
  }

  render() {
    const { defaultCountryList, loading } = this.state;

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
              <TabHeading style={{ backgroundColor: "#2196f3" }}>
                <Text style={{ color: "#fff" }}>OVERVIEW</Text>
              </TabHeading>
            }
          >
            {this.props.countryState.addedCountries &&
            this.props.countryState.addedCountries.length > 0 ? (
              <ScrollView>
                {this.props.countryState.addedCountries.map((item, index) => {
                  return (
                    <SingleListItem
                      key={"Country" + index}
                      countryName={item}
                      flag={
                        defaultCountryList.find(c => c.country === item).source
                      }
                      actionBtn="right"
                      actionBtnRightText="Edit"
                      handleOnPress={() =>
                        this.props.navigation.navigate("EditBucketList", {
                          countryName: item
                        })
                      }
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <View style={styles.centerContent}>
                <Text style={{ fontWeight: "bold" }}>No countries added!</Text>
              </View>
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: "#2196f3" }}>
                <Text style={{ color: "#fff" }}>DETAILS</Text>
              </TabHeading>
            }
          >
            <ScrollView>
              {this.props.bucketlistState.bucketlists &&
                this.props.bucketlistState.bucketlists.map((item, index) => {
                  return (
                    <Card key={"countryCard" + index}>
                      <CardItem>
                        <Body>
                          <View style={styles.cardTitle}>
                            <Image
                              style={{ width: 40 }}
                              resizeMode="contain"
                              source={
                                defaultCountryList.find(
                                  c => c.country === item.country
                                ).source
                              }
                            />
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                textAlignVertical: "center"
                              }}
                            >
                              {" "}
                              {item.country}
                            </Text>
                          </View>

                          <View
                            style={{
                              flex: 1,
                              flexDirection: "column"
                            }}
                          >
                            {item.items.map((idea, index) => {
                              return (
                                <View key={"idea" + index}>
                                  <Text>
                                    {item.achieved[index] ? (
                                      <Icon
                                        style={{ color: "#4CAF50" }}
                                        size={18}
                                        name="check-circle"
                                      />
                                    ) : (
                                      <Icon
                                        style={{ color: "#2196f3" }}
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
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getBucketListAction: () => dispatch(getBucketListAction()),
  getAllCountriesAction: () => dispatch(getAllCountriesAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  flag: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  headerBtn: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
    borderColor: "#fff",
    borderWidth: 1,
    padding: 5,
    borderRadius: 20
  },
  cardTitle: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#2196f3"
  }
});
