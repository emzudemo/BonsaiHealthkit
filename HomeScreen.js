import * as React from 'react';
import {Text, View, Button} from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen</Text>
        <Button title="Go to Details" onPress={() => this.props.navigation.navigate('Details')} />
        <Button
          title="Set a step goal"
          onPress={() => this.props.navigation.navigate('GoalSteps')}
        />
        <Button
          title="Set a Walking / Running Distance goal"
          onPress={() => this.props.navigation.navigate('RunningGoal')}
        />
        <Button title="Get Samples" onPress={() => this.props.navigation.navigate('Healthkit')} />

        <Button title="PayPal" onPress={() => this.props.navigation.navigate('Paypal')} />
      </View>
    );
  }
}
