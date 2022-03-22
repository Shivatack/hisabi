import { StatusBar } from 'expo-status-bar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Registration from './components/Registration';
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
                    name="Registration"
                    component={Registration}
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
