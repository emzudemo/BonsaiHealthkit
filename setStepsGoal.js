import * as React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {stepCount, CompareSteps} from './Steps';

export default class setStepsGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wantedSteps: '',
      success: ''
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here how many steps you want to take!"
          onChangeText={wantedSteps => this.setState({wantedSteps})}
          value={this.state.wantedSteps}
        />

        <Text>You did {stepCount} Steps</Text>
        <Text>and you wanted to make {this.state.wantedSteps} Steps</Text>

        <Button
          onPress={() => {
            this.setState({success: CompareSteps(stepCount, this.state.wantedSteps)});
          }}
          title="Did I make it?"
        />

        <Text>{this.state.success}</Text>
      </View>
    );
  }
}
