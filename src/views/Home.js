import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  View
} from "react-native";
import { Container, Content, Spinner, Fab } from "native-base";
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
    const allBucketlists = this.props.bucketlistState.bucketlists;

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
        {allBucketlists.length > 0 ? (
          <ScrollView>
            {allBucketlists.map((item, index) => {
              return (
                <SingleListItem
                  key={"Country" + index}
                  countryName={item.country}
                  secondIcon={true}
                  goalsCompleted={
                    allBucketlists[index].achieved.filter(i => i === true)
                      .length
                  }
                  totalGoals={allBucketlists[index].items.length}
                  flag={
                    defaultCountryList.find(c => c.country === item.country)
                      .source
                  }
                  actionBtn="right"
                  handleOnPress={() =>
                    this.props.navigation.navigate("EditBucketList", {
                      countryName: item.country
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

        <Fab
          style={{ backgroundColor: "#2196f3" }}
          position="bottomRight"
          onPress={() => this.props.getBucketListAction()}
        >
          <Icon size={20} name="refresh" />
        </Fab>
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
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
