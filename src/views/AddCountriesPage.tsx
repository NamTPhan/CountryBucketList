import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Container } from "native-base";

import { SingleListItem } from "../components/SingleListItem";
import Countries from "../data/CountriesFlags.js";

import * as Colors from "../styles/Colors";

export const AddCountriesPage = () => {
  return (
    <Container>
      <Text>Add Countries</Text>

      <ScrollView>
        {/* {defaultCountryList.map((item, index) => {
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
                  actionBtn={activateBtn && "add"}
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
            })} */}
      </ScrollView>

      {/* {this.props.countryState.addedCountries !== undefined &&
      this.props.countryState.addedCountries.length > 0 ? (
        <ScrollView>
          {this.props.countryState.addedCountries.map((item, index) => {
            return (
              <SingleListItem
                key={"Country" + index}
                countryName={item}
                actionBtn={"trash"}
                flag={defaultCountryList.find(c => c.country === item).source}
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
          <Text style={{ fontWeight: "bold" }}>No countries added!</Text>
        </View>
      )} */}
    </Container>
  );
};

// class AddCountries extends Component {
//   static navigationOptions = {
//     title: "Add Countries",
//   };

//   constructor (props) {
//     super(props);
//     props.getAllCountriesAction();

//     this.state = {
//       defaultCountryList: [],
//       loading: true,
//       activateBtn: true,
//     };
//   }
// }

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
