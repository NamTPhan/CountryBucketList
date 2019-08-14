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
  getAllCountriesAction
} from "../actions/countryActions.js";
import { addDefaultBucketListAction } from "../actions/bucketlistActions.js";

class AddCountries extends Component {
  static navigationOptions = {
    title: "Add Countries"
  };

  constructor(props) {
    super(props);

    this.state = {
      defaultCountryList: [],
      loading: true
    };
  }

  componentWillMount() {
    this.props.getAllCountriesAction();
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
    Toast.show({
      text: text,
      duration: 8000,
      type: type,
      position: "bottom"
    });
  };

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
      <Root>
        <Container>
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
                  if (
                    this.props.countryState.addedCountries.includes(
                      item.country
                    )
                  ) {
                    return null;
                  } else {
                    return (
                      <SingleListItem
                        key={"Country" + index}
                        countryName={item.country}
                        flag={item.source}
                        actionBtn="add"
                        handleOnBtnPress={() => {
                          this.props.addCountryAction(item.country);
                          this.props.addDefaultBucketListAction(item.country);

                          this.toastMessage(
                            "Country successfully added!",
                            "success"
                          );
                        }}
                      />
                    );
                  }
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
              {this.props.countryState.addedCountries.length > 0 ? (
                <ScrollView>
                  {this.props.countryState.addedCountries.map((item, index) => {
                    return (
                      <SingleListItem
                        key={"Country" + index}
                        countryName={item}
                        flag={
                          defaultCountryList.find(c => c.country === item)
                            .source
                        }
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
        </Container>
      </Root>
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
    dispatch(addDefaultBucketListAction(country))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCountries);

const styles = StyleSheet.create({
  flag: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
