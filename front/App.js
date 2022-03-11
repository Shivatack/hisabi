import { StatusBar } from 'expo-status-bar';
import { Dashboard } from './components/dashboard/Dashboard';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './components/login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{}}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{}}
                />
            </Stack.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
