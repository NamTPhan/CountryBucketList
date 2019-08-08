import React, { Component } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { Container, Content, Spinner } from "native-base";
import { connect } from "react-redux";

import SingleListItem from "../components/SingleListItem/SingleListItem";
import Countries from "../data/CountriesFlags.js";

import {
  addCountryAction,
  getAllCountriesAction
} from "../actions/countryActions.js";

class AddCountries extends Component {
  static navigationOptions = {
    title: "Add Countries"
  };

  constructor(props) {
    super(props);

    this.state = {
      defaultCountryList: [],
      addedCountries: null,
      loading: true
    };
  }

  componentDidMount() {
    this.props.getAllCountriesAction();

    setTimeout(() => {
      this.setState({
        defaultCountryList: Countries,
        loading: false
      });
    }, 1500);
  }

  test = () => {
    alert("DDD");
  };

  render() {
    const { defaultCountryList, loading } = this.state;
    const addedCountries = this.props.countryState.addedCountries;

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
        <ScrollView>
          <Text>{addedCountries}</Text>
          {defaultCountryList.map((item, index) => {
            return (
              <SingleListItem
                key={"Country" + index}
                countryName={item.country}
                flag={item.source}
                actionBtn={
                  this.props.countryState.addedCountries.includes(item.country)
                    ? null
                    : "add"
                }
                handleOnBtnPress={() =>
                  this.props.addCountryAction(item.country)
                }
              />
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getAllCountriesAction: () => dispatch(getAllCountriesAction()),

  addCountryAction: country => dispatch(addCountryAction(country))
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
  }
});
