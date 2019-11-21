import * as React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {distanceCount, CompareDistance} from './WalkingRunning';

export default class setWalkingRunningGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wantedDistance: '',
      success: ''
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here which distance you want to walk or run!"
          onChangeText={wantedDistance => this.setState({wantedDistance})}
          value={this.state.wantedDistance}
        />

        <Text>You did {distanceCount} metres</Text>
        <Text>and you wanted to make {this.state.wantedDistance} metres</Text>

        <Button
          onPress={() => {
            this.setState({success: CompareDistance(distanceCount, this.state.wantedDistance)});
          }}
          title="Did I make it?"
        />

        <Text>{this.state.success}</Text>
      </View>
    );
  }
}
