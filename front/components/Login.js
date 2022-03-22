import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { API_URL } from '@env';

const styles = require('./common/style');

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    async onLoginPressed() {
        let login_url = API_URL + 'login';
        
        await fetch(login_url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if (json.message)
                alert(json.message);
            else
                this.props.navigation.navigate('Dashboard', {});
        })
        .catch((error) => alert(error)
        );
    }

    onRegisterPressed() {
        this.props.navigation.navigate('Registration', {});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.vertical}>
                    <Text style={styles.title}>Hisabi</Text>
                    <TextInput style={styles.textinput} placeholder='email@example.com' placeholderTextColor="gray" onChangeText={(email) => this.setState({ email: email })} />
                    <TextInput style={styles.textinput} secureTextEntry={true} placeholder='password' placeholderTextColor="gray" onChangeText={(password) => this.setState({ password: password })} />
                </View>
                <View style={styles.horizontal}>
                    <Button onPress={ () => this.onRegisterPressed() } title='Register' />
                    <Button onPress={ () => this.onLoginPressed() } title='Login' />
                </View>
            </View>
        );
    }
}