import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';

const workoutData = [];
const startDate = new Date(2019, 10, 19).toISOString();
const endDate = new Date(2019, 10, 22).toISOString();

const permissions = {
  permissions: {
    read: ['DistanceWalkingRunning'],
    write: []
  }
};

const options = {
  startDate,
  endDate
};

AppleHealthKit.initHealthKit(permissions, (err, results) => {
  if (err) {
    console.log('error initializing Healthkit: ', err);
    return;
  }

  AppleHealthKit.getDailyDistanceWalkingRunningSamples(
    options,
    (err: Object, results: Array<Object>) => {
      console.log(results);
      console.log(startDate);
      console.log(endDate);
      // workoutData = results.values;
      // workoutData = results;
    }
  );
});

export default class getDataFromHealthkit extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Pls give me data:{workoutData}</Text>
      </View>
    );
  }
}
