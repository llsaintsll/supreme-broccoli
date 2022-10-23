import 'react-native-gesture-handler';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './src/pages/HomeScreen';
import RegisterMovie from "./src/pages/RegisterMovie";
import UpdateMovie from './src/pages/UpdateMovie';
import ViewMovie from './src/pages/ViewMovie';
import ViewAllMovies from './src/pages/ViewAllMovies';
import DeleteMovie from './src/pages/DeleteMovie';

const Stack = createStackNavigator();

const App = () => {
    return (
         <NavigationContainer>
             <Stack.Navigator initialRouteName="HomeScreen">
                 <Stack.Screen
                      name="HomeScreen"
                      component={HomeScreen}
                      options={{
                          title: 'Supreme Broccoli - the must have app for film lovers',
                          headerStyle: {
                              backgroundColor: '#00AD98',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                              whiteSpace: ''
                          },
                      }}
                 />
                 <Stack.Screen
                      name="Register"
                      component={RegisterMovie}
                      options={{
                          title: 'Cadastrar Novo Filme',
                          headerStyle: {
                              backgroundColor: '#2992C4',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}
                 />
                 <Stack.Screen
                      name="Update"
                      component={UpdateMovie}
                      options={{
                          title: 'Atualizar Resenha',
                          headerStyle: {
                              backgroundColor: '#A45BB9',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}
                 />
                 <Stack.Screen
                      name="View"
                      component={ViewMovie}
                      options={{
                          title: 'Visualizar Resenha',
                          headerStyle: {
                              backgroundColor: '#F9AD29',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}
                 />
                 <Stack.Screen
                      name="ViewAll"
                      component={ViewAllMovies}
                      options={{
                          title: 'Visualizar Todos as Resenhas',
                          headerStyle: {
                              backgroundColor: '#384F62',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}
                 />
                 <Stack.Screen
                      name="Delete"
                      component={DeleteMovie}
                      options={{
                          title: 'Excluir Resenha',
                          headerStyle: {
                              backgroundColor: '#D1503A',
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}
                 />
             </Stack.Navigator>
         </NavigationContainer>
    );
};

export default App;