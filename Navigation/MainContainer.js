import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../assets/Colors/color';

import HomeScreen from './Screens/HomeScreen';
import ShoppingScreen from './Screens/ShoppingScreen';
import TrustedPeople from './Screens/TrustedPeople';
import CartScreen from './Screens/CartScreen';
import CaseScreen from './Screens/CaseScreen';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === "Shop") {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === "Trusted People") {
                        iconName = focused ? 'people' : 'people-outline';
                    } else if (route.name === "Cart") {
                        iconName = focused ? 'card' : 'card-outline';
                    } else if (route.name === "Case") {
                        iconName = focused ? 'briefcase' : 'briefcase-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarStyle: { height: 60 },
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: '#fff',
                headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
            })}
        >
            <Tab.Screen name="Trusted People" component={TrustedPeople} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Shop" component={ShoppingScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Case" component={CaseScreen} />
        </Tab.Navigator>
    );
}
