import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import CustomTabBar from "../components/CustomTabBar";

import HomeStack from './HomeStack'
import WorkoutStack from './WorkoutStack'
import MyWorkoutsStack from './MyWorkoutsStack'

export default createBottomTabNavigator({
    HomeStack,
    WorkoutStack:{
      screen:WorkoutStack,
      navigationOptions:{
        tabBarVisible:false
      }
    },
    MyWorkoutsStack
},{
  tabBarComponent:(props) => (
    <CustomTabBar
      {...props}
      items={[
        {
          type: 'regular', 
          text: 'Inicio', 
          icons: require('../assets/home.png'), 
          route: 'HomeStack'
        },
        {
          type: 'big', 
          icons: require('../assets/dumbbell.png'), 
          route: 'WorkoutStack'
        },
        {
          type: 'regular', 
          text: 'Meus Treinos', 
          icons: require('../assets/myworkouts.png'), 
          route: 'MyWorkoutsStack'
        }
      ]}
    />
  )
})