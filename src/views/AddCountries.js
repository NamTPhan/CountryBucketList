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
  Root
} from "native-base";
import { connect } from "react-redux";

import SingleListItem from "../components/SingleListItem/SingleListItem";
import Countries from "../data/CountriesFlags.js";

import {
  addCountryAction,
  deleteCountryAction,
  getAllCountriesAction
} from "../actions/countryActions.js";
import {
  addDefaultBucketListAction,
  deleteBucketListAction
} from "../actions/bucketlistActions.js";

class AddCountries extends Component {
  static navigationOptions = {
    title: "Add Countries"
  };

  constructor(props) {
    super(props);
    props.getAllCountriesAction();

    this.state = {
      defaultCountryList: [],
      loading: true,
      activateBtn: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        defaultCountryList: Countries,
        loading: false
      });
    }, 1000);
  }

  toastMessage = (text, type) => {
    this.setState({
      activateBtn: false
    });

    Toast.show({
      text: text,
      duration: 3000,
      type: type,
      position: "bottom"
    });

    setTimeout(() => {
      this.setState({
        activateBtn: true
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
                          defaultCountryList.find(c => c.country === item)
                            .source
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

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getAllCountriesAction: () => dispatch(getAllCountriesAction()),

  addCountryAction: country => dispatch(addCountryAction(country)),
  addDefaultBucketListAction: country =>
    dispatch(addDefaultBucketListAction(country)),

  deleteCountryAction: index => dispatch(deleteCountryAction(index)),
  deleteBucketListAction: index => dispatch(deleteBucketListAction(index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCountries);

const styles = StyleSheet.create({
  flag: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
