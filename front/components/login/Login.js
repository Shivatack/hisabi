import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    async onLoginPressed() {
        alert(this.state.email + "\n" + this.state.password);
        this.props.navigation.navigate('Dashboard', {})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Hisabi</Text>
                <TextInput style={styles.textinput} placeholder='email@example.com' onChangeText={(email) => this.setState({ email: email })} />
                <TextInput style={styles.textinput} secureTextEntry={true} placeholder='password' onChangeText={(password) => this.setState({ password: password })} />
                <Button onPress={ () => this.onLoginPressed() } title='Login' />
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
        padding: 5,
        minWidth: 300
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginBottom: 30
    }
});
