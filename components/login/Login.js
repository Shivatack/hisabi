import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export class Login extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textinput} placeholder='email@example.com' />
                <TextInput style={styles.textinput} placeholder='password' />
                <Button title='Login' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textinput: {
        height: 40,
        fontSize: 24,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        padding: 5
    },
    container: {
        minWidth: 300
    }
});
