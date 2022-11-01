import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useQuery} from '@apollo/client';
import {CHANGE_COLOR_TAB_BAR} from './graphql/queries';
import {HomeScreen, MapScreen, NewsScreen, ProfileScreen} from 'screens';
import {TabIcon} from 'components';

const TabBar = createBottomTabNavigator();

export const TabBarNavigator = () => {
  const {data} = useQuery(CHANGE_COLOR_TAB_BAR);
  const {changeColorTabBar} = data;

  return (
    <TabBar.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: changeColorTabBar
            ? 'rgba(62, 33, 77, 0.7)'
            : 'rgba(149, 143, 163, 0.9)',
          height: 80,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
        },
      }}>
      <TabBar.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name="Home" focused={focused} iconName="home" />
          ),
        }}
      />
      <TabBar.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name="Map" focused={focused} iconName="map" />
          ),
        }}
      />
      <TabBar.Screen
        name="NewsLoginScreen"
        component={NewsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon name="News" focused={focused} iconName="newspaper" />
          ),
        }}
      />
      <TabBar.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              name="Profile"
              focused={focused}
              iconName="person-circle-outline"
            />
          ),
        }}
      />
    </TabBar.Navigator>
  );
};
