/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Store} from './redux/index';
import IconButton from './components/buttons/IconButton';
import {View, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
//NON-SECURED
import Login from './screens/non-secured/Login';
import SplashScreen from './screens/non-secured/Splash';

//SECURED
//---Home
import HomeScreen from './screens/secured/home/Home';

//---Orders
import OrdersScreen from './screens/secured/orders/Orders';
import NewOrders from './screens/secured/orders/newOrders/NewOrders';
//---Profile
import ProfileScreen from './screens/secured/profile/Profile';
import {Colors} from './theme';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const OrderStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const BottomTab = createBottomTabNavigator();

const ButtonClose = () => {
    const {goBack} = useNavigation();
    return (
        <IconButton onPress={goBack}>
            <Feather
                style={{marginRight: 20}}
                color={Colors.Red}
                size={30}
                name="x"
            />
        </IconButton>
    );
};

function showTabBar(route) {
    return route.route.state ? route.route.state.index < 1 : true;
}

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="LOGIN"
            screenOptions={{
                animationEnabled: true,
                headerShown: false,
            }}>
            <AuthStack.Screen name="LOGIN" component={Login} />
        </AuthStack.Navigator>
    );
};

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator
            initialRouteName="HOME_LIST"
            screenOptions={{
                animationEnabled: true,
                headerBackImage: () => null,
                headerRight: () => <ButtonClose />,
                headerBackTitle: ' ',
                headerStyle: {},
                headerTitleStyle: {letterSpacing: 2.2},
            }}>
            <HomeStack.Screen
                name="HOME"
                options={{headerShown: false}}
                component={HomeScreen}
            />
        </HomeStack.Navigator>
    );
};

const OrderStackNavigator = () => {
    return (
        <OrderStack.Navigator
            initialRouteName="ORDERS_LIST"
            screenOptions={{
                animationEnabled: true,
                headerShown: false,
            }}>
            <OrderStack.Screen
                name="ORDERS"
                component={OrdersScreen}
                options={{headerShown: false}}
            />
            <OrderStack.Screen name="NEW_ORDERS" component={NewOrders} />
        </OrderStack.Navigator>
    );
};

const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator
            initialRouteName="PROFILE_LIST"
            screenOptions={{
                animationEnabled: true,
                headerBackTitle: ' ',
                headerStyle: {},
                headerTitleStyle: {letterSpacing: 2.2},
            }}>
            <ProfileStack.Screen
                name="PROFILE"
                options={{headerShown: false}}
                component={ProfileScreen}
            />
        </ProfileStack.Navigator>
    );
};

const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator
            initialRouteName="ORDERS"
            tabBarOptions={{showLabel: false}}>
            <BottomTab.Screen
                name="HOME"
                component={HomeStackNavigator}
                options={(route) => {
                    return {
                        title: 'Home',
                        tabBarVisible: showTabBar(route),
                        tabBarIcon: ({focused}) => (
                            <View
                                style={{
                                    borderBottomWidth: focused ? 2 : null,
                                    borderColor: focused ? Colors.Red : null,
                                    alignItems: 'center',
                                }}>
                                <Feather
                                    name="home"
                                    size={25}
                                    color={
                                        !focused ? Colors.Orange : Colors.Red
                                    }
                                />
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: 11,
                                        color: !focused
                                            ? Colors.Orange
                                            : Colors.Red,
                                    }}>
                                    Home
                                </Text>
                            </View>
                        ),
                    };
                }}
            />
            <BottomTab.Screen
                name="ORDERS"
                component={OrderStackNavigator}
                options={(route) => {
                    return {
                        title: 'Órdenes',
                        tabBarVisible: showTabBar(route),
                        tabBarIcon: ({focused}) => (
                            <View
                                style={{
                                    borderBottomWidth: focused ? 2 : null,
                                    borderColor: focused ? Colors.Red : null,
                                    alignItems: 'center',
                                }}>
                                <Feather
                                    name="codesandbox"
                                    size={24}
                                    color={
                                        !focused ? Colors.Orange : Colors.Red
                                    }
                                />
                                <Text
                                    style={{
                                        fontFamily: 'Poppins-SemiBold',
                                        fontSize: 11,
                                        color: !focused
                                            ? Colors.Orange
                                            : Colors.Red,
                                    }}>
                                    Compras
                                </Text>
                            </View>
                        ),
                    };
                }}
            />
            <BottomTab.Screen
                name="PROFILE"
                component={ProfileNavigator}
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({focused}) => (
                        <View
                            style={{
                                borderBottomWidth: focused ? 2 : null,
                                borderColor: focused ? Colors.Red : null,
                                alignItems: 'center',
                            }}>
                            <Feather
                                name="user"
                                size={24}
                                color={!focused ? Colors.Orange : Colors.Red}
                            />
                            <Text
                                style={{
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 11,
                                    color: !focused
                                        ? Colors.Orange
                                        : Colors.Red,
                                }}>
                                Perfil
                            </Text>
                        </View>
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

const RootRouter = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SPLASH"
                component={SplashScreen}
                options={{
                    headerShown: false,
                    animationEnabled: false,
                }}
            />
            <Stack.Screen
                name="AUTH"
                options={{
                    headerShown: false,
                    animationEnabled: false,
                }}
                component={AuthStackNavigator}
            />
            <Stack.Screen
                name="APP"
                options={{
                    headerShown: false,
                    animationEnabled: true,
                    gestureEnabled: false,
                }}
                component={BottomTabNavigator}
            />
        </Stack.Navigator>
    );
};

function App() {
    const persistor = persistStore(Store);
    return (
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <RootRouter />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

export default App;
