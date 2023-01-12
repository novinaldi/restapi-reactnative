import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShowData from './ShowData';
import FormInputStudents from './FormInputStudents';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetailStudents from './DetailStudents';
import FormEditStudents from './FormEditStudents';

const Stack = createNativeStackNavigator();
const navOptions = ({ route, navigation }) => ({
  title: route.params.title,
  headerStyle: {
    backgroundColor: '#810CA8',
  },
  headerTitleStyle: {
    color: '#fff',
  },
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" color="white" size={20} />
    </TouchableOpacity>
  ),
});
export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShowData">
        <Stack.Screen
          name="ShowData"
          component={ShowData}
          options={{
            title: 'Data Students',
            headerStyle: {
              backgroundColor: '#810CA8',
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />

        <Stack.Screen name="FormInputStudents" component={FormInputStudents}
          options={navOptions}
        />
        <Stack.Screen name="DetailStudents" component={DetailStudents}
          options={
            { headerShown: false }
          }
        />
        <Stack.Screen name="FormEditStudents" component={FormEditStudents}
          options={navOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
