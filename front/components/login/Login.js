import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { API_URL } from '@env';

export class Login extends React.Component {
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
