import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View
} from "react-native";
import { Container, Content, Spinner } from "native-base";

import { connect } from "react-redux";

import Countries from "../data/CountriesFlags.js";
import SingleListItem from "../components/SingleListItem/SingleListItem.js";

import { getAllCountriesAction } from "../actions/countryActions.js";

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
        {this.props.countryState.addedCountries.length > 0 ? (
          <ScrollView>
            {this.props.countryState.addedCountries.map((item, index) => {
              return (
                <SingleListItem
                  key={"Country" + index}
                  countryName={item}
                  secondIcon={true}
                  goalsCompleted={3}
                  totalGoals={10}
                  flag={defaultCountryList.find(c => c.country === item).source}
                  actionBtn="right"
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
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
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
