import React, { Component } from 'react';
import MaskInput, { Masks } from 'react-native-mask-input';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { API_URL } from '@env';

const styles = require('./common/style');

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            validatepassword: '',
            birthday: moment(new Date()).format("DD/MM/YYYY"),
            birthDate: new Date(),
            mode: 'date',
            showdatepicker: false
        };
    }

    onChangeBirthday = (selectedDate) => {
        if (typeof selectedDate == "string") {
            this.setState({
                birthday: selectedDate
            });
            let birthDate = null;
            if (selectedDate.length == 10) {
                let dateString = '';
                const dateArray = selectedDate.replaceAll('/', '-').split('-');
                for (let index = dateArray.length - 1; index > -1; index--) {
                    const element = dateArray[index];
                    dateString += element;
                    if (index > 0)
                        dateString += '-';
                }
                birthDate = new Date(Date.parse(dateString));
                if (birthDate)
                    this.setState({
                        birthDate: birthDate
                    });
                else
                    this.setState({
                        birthday: moment(new Date()).format("DD/MM/YYYY"),
                        birthDate: new Date()
                    });
            }
        } else {
            this.setState({
                birthday: moment(selectedDate).format("DD/MM/YYYY"),
                birthDate: selectedDate
            });
        }
    }

    showMode = (currentMode) => {
        this.setState({
            mode: currentMode,
            showdatepicker: !this.state.showdatepicker
        });
    }
    
    showDatepicker = () => {
        this.showMode('date');
    }

    emailCheck(email) {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        return emailRegex.test(email);
    }

    passwordCheck(password, validatepassword) {
        // false
        if (password !== validatepassword)
            return 0;

        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // false
        if (!passwordRegex.test(password))
            return 1;
        
        // true
        return 2;
    }

    birthdayCheck(birthday, birthDate) {
        // false
        if (birthday.length < 10)
            return 0;

        // false
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var months = today.getMonth() - birthDate.getMonth();
        if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate()))
            age--;
        if (age < 18)
            return 1;
        
        // true
        return 2;
    }

    async onRegisterPressed() {
        let registration_url = API_URL + 'register';

        // check if fields are fully completed
        if (!(this.state.firstname && this.state.lastname && this.state.email && this.state.password && this.state.validatepassword && this.state.birthday)) {
            alert("All fields are required!");
            return;
        }

        // check email
        if (!this.emailCheck(this.state.email)) {
            alert("The email provided is not valid!");
            return;
        }

        // check password
        const passwordCheck = this.passwordCheck(this.state.password, this.state.validatepassword);
        switch (passwordCheck) {
            case 0:
                alert("Password and confirmation don't match!");
                return;
            case 1:
                alert("Password should be minimum 8 characters, one uppercase letter, one lowercase letter, one number and one special character!");
                return;
        }

        // check birthday and birthdate
        const birthDateCheck = this.birthdayCheck(this.state.birthday, this.state.birthDate);
        switch (birthDateCheck) {
            case 0:
                alert("Birthdate is required!");
                return;
            case 1:
                alert("You must be over 18 to register!");
                return;
        }
        
        alert("Everything is okay!");

        // await fetch(login_url, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: this.state.email,
        //         password: this.state.password
        //     })
        // })
        // .then((response) => response.json())
        // .then((json) => {
        //     if (json.message)
        //         alert(json.message);
        //     else
        //         this.props.navigation.navigate('Login', {});
        // })
        // .catch((error) => alert(error)
        // );
    }

    render() {
        return (
            <View style={styles.registrationcontainer}>
                <Text style={styles.title}>Registration</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder='firstname'
                    placeholderTextColor="gray"
                    value={this.state.firstname ? this.state.firstname : null}
                    onChangeText={(firstname) => this.setState({ firstname: firstname })}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='lastname'
                    placeholderTextColor="gray"
                    value={this.state.lastname ? this.state.lastname : null}
                    onChangeText={(lastname) => this.setState({ lastname: lastname })}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder='email@example.com'
                    placeholderTextColor="gray"
                    keyboardType='email-address'
                    value={this.state.email ? this.state.email : null}
                    onChangeText={(email) => this.setState({ email: email })}
                />
                <TextInput
                    style={styles.textinput}
                    secureTextEntry={true}
                    placeholder='password'
                    placeholderTextColor="gray"
                    passwordRules="required: upper; required: lower; required: digit; required: special; minlength: 8;"
                    onChangeText={(password) => this.setState({ password: password })}
                />
                <TextInput
                    style={styles.textinput}
                    secureTextEntry={true}
                    placeholder='validate password'
                    placeholderTextColor="gray"
                    passwordRules="required: upper; required: lower; required: digit; required: special; minlength: 8;"
                    onChangeText={(validatepassword) => this.setState({ validatepassword: validatepassword })}
                />
                <View style={styles.birthdayselect}>
                    <MaskInput
                        style={styles.birthdaytextinput}
                        placeholder='select your date of birth'
                        placeholderTextColor="gray"
                        keyboardType='number-pad'
                        mask={Masks.DATE_DDMMYYYY}
                        value={this.state.birthday}
                        clearTextOnFocus={true}
                        onChangeText={(birthday) => this.onChangeBirthday(birthday)}
                    />
                    <Ionicons
                        style={styles.calendaricon}
                        name='md-calendar'
                        size={32}
                        color="black"
                        onPress={() => this.showDatepicker()}
                    />
                </View>
                {this.state.showdatepicker && (
                    <DateTimePicker
                        style={styles.datepicker}
                        value={this.state.birthDate}
                        mode={this.state.mode}
                        onChange={(_, birthday) => this.onChangeBirthday(birthday)}
                        dateFormat='day month year'
                        display='spinner'
                    />
                )}
                <Button onPress={() => this.onRegisterPressed()} title='Register' />
            </View>
        );
    }
}