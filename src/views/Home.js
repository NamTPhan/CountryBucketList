import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Container, Content } from "native-base";
import { connect } from "react-redux";

import Countries from "../data/CountriesFlags.js";
import SingleListItem from "../components/SingleListItem/SingleListItem.js";

import { getAllCountries } from "../actions/countryActions.js";

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Bucket Lists",
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("AddCountries")}>
        <Text style={styles.headerBtn}>ADD COUNTRY</Text>
      </TouchableOpacity>
    )
  });

  test() {
    alert("clicked");
  }

  render() {
    return (
      <Container>
        <Content>
          <SingleListItem
            countryName="Belgium"
            goalsCompleted={3}
            totalGoals={10}
            flag={Countries[15].source}
            actionBtn="trash"
            handleOnPress={() =>
              this.props.navigation.navigate("EditBucketList")
            }
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getAllCountries: () => dispatch(getAllCountries())
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
  }
});
