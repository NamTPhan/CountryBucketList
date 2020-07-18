import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import {
  Container,
  Content,
  Spinner,
  Tab,
  Tabs,
  TabHeading,
  Toast,
  Root,
  Card,
  CardItem,
  Body,
} from "native-base";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

import SingleListItem from "../components/SingleListItem/SingleListItem";
import Countries from "../data/CountriesFlags.js";

import {
  addCountryAction,
  deleteCountryAction,
  getAllCountriesAction,
} from "../actions/countryActions.js";
import {
  addDefaultBucketListAction,
  deleteBucketListAction,
} from "../actions/bucketlistActions.js";

class AddCountries extends Component {
  static navigationOptions = {
    title: "Add Countries",
  };

  constructor(props) {
    super(props);
    props.getAllCountriesAction();

    this.state = {
      defaultCountryList: [],
      loading: true,
      activateBtn: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        defaultCountryList: Countries,
        loading: false,
      });
    }, 1000);
  }

  toastMessage = (text, type) => {
    this.setState({
      activateBtn: false,
    });

    Toast.show({
      text: text,
      duration: 3000,
      type: type,
      position: "bottom",
    });

    setTimeout(() => {
      this.setState({
        activateBtn: true,
      });
    }, 2000);
  };

  render() {
    const { defaultCountryList, loading, activateBtn } = this.state;

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
        <Root>
          <Tabs>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#2196f3" }}>
                  <Text style={{ color: "#fff" }}>AVAILABLE</Text>
                </TabHeading>
              }
            >
              <ScrollView>
                <Card style={styles.cardOverallInfo}>
                  <CardItem>
                    <Body>
                      <Text style={{ alignSelf: "center" }}>
                        <Icon
                          style={{ color: "#ff0000" }}
                          size={15}
                          name="warning"
                        />{" "}
                        Travel Advisory: Do Not Travel
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
                {defaultCountryList.map((item, index) => {
                  if (this.props.countryState.addedCountries !== undefined) {
                    if (
                      this.props.countryState.addedCountries.includes(
                        item.country
                      )
                    ) {
                      return null;
                    }
                  }

                  return (
                    <SingleListItem
                      key={"Country" + index}
                      countryName={item.country}
                      flag={item.source}
                      safe={item.safe}
                      actionBtn={activateBtn ? "add" : null}
                      handleOnBtnPress={() => {
                        this.toastMessage(
                          "Country successfully added!",
                          "success"
                        );
                        this.props.addCountryAction(item.country);
                        this.props.addDefaultBucketListAction(item.country);
                      }}
                    />
                  );
                })}
              </ScrollView>
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#2196f3" }}>
                  <Text style={{ color: "#fff" }}>MY COUNTRIES</Text>
                </TabHeading>
              }
            >
              {this.props.countryState.addedCountries !== undefined &&
              this.props.countryState.addedCountries.length > 0 ? (
                <ScrollView>
                  {this.props.countryState.addedCountries.map((item, index) => {
                    return (
                      <SingleListItem
                        key={"Country" + index}
                        countryName={item}
                        actionBtn={"trash"}
                        flag={
                          defaultCountryList.find((c) => c.country === item)
                            .source
                        }
                        safe={
                          defaultCountryList.find((c) => c.country === item)
                            .safe
                        }
                        handleDeleteBtn={() => {
                          this.props.deleteCountryAction(index);
                          this.props.deleteBucketListAction(index);
                        }}
                      />
                    );
                  })}
                </ScrollView>
              ) : (
                <View style={styles.centerContent}>
                  <Text style={{ fontWeight: "bold" }}>
                    No countries added!
                  </Text>
                </View>
              )}
            </Tab>
          </Tabs>
        </Root>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCountriesAction: () => dispatch(getAllCountriesAction()),

  addCountryAction: (country) => dispatch(addCountryAction(country)),
  addDefaultBucketListAction: (country) =>
    dispatch(addDefaultBucketListAction(country)),

  deleteCountryAction: (index) => dispatch(deleteCountryAction(index)),
  deleteBucketListAction: (index) => dispatch(deleteBucketListAction(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCountries);

const styles = StyleSheet.create({
  flag: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardOverallInfo: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
