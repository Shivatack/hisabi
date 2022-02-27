import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Login } from './components/login/Login';

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Project Assu</Text>
            <Login />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginBottom: 30
    }
});
