import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Container, Content, Spinner } from "native-base";

import SingleListItem from "../components/SingleListItem/SingleListItem";
import Countries from "../data/CountriesFlags.js";

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

  componentDidMount() {
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
          {defaultCountryList.map((item, index) => {
            return (
              <SingleListItem
                key={"Country" + index}
                countryName={item.country}
                flag={item.source}
                actionBtn="add"
                handleOnBtnPress={this.test}
              />
            );
          })}
        </ScrollView>
      </Container>
    );
  }
}

export default AddCountries;

const styles = StyleSheet.create({
  flag: {
    flex: 1,
    width: undefined,
    height: undefined
  }
});
