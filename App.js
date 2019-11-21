import * as React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import setStepsGoal from './setStepsGoal';
import setWalkingRunningGoal from './setWalkingRunningGoal';
import getDataFromHealthkit from './getDataFromHealthkit';
import Paypal from './paypal';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    GoalSteps: setStepsGoal,
    Healthkit: getDataFromHealthkit,
    Paypal,
    RunningGoal: setWalkingRunningGoal
  },
  {
    initialRouteName: 'Home'
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
