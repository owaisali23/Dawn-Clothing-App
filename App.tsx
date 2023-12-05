import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyComp from './screens/components/mycomp';
import Component2 from './screens/components/Component2';
import ShowProd from './screens/Product/ShowProd';
import AddProd from './screens/Product/AddProd';
import Update from './screens/Product/Update';
import ShowEdit from './screens/Product/ShowEdit';
import Home from './screens/Product/Home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="ShowProd" component={ShowProd} />
        <Stack.Screen /* options={{ headerShown: false }}*/options={{
          headerStyle: {
            backgroundColor: '#AA613E',
          },
          headerTitleAlign: "center",
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontSize: 18,
          },
        }} name="ShowEdit" component={ShowEdit} />
        <Stack.Screen /* options={{ headerShown: false }}*/ name="MyComp" component={MyComp} />
        <Stack.Screen /* options={{ headerShown: false }}*/options={{
          headerStyle: {
            backgroundColor: '#AA613E',
          },
          headerTitleAlign: "center",
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontSize: 18,
          },
        }} name="Update" component={Update} />
        <Stack.Screen /* options={{ headerShown: false }}*/options={{
          headerStyle: {
            backgroundColor: '#AA613E',
          },
          headerTitleAlign: "center",
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontSize: 18,
          },
        }} name="AddProd" component={AddProd} />
        <Stack.Screen name="Component2" component={Component2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

