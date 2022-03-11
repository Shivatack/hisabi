import React from "react";
import Login from '../login/Login';
import { View, Text } from "react-native";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Dashboard</Text>
            </View>
        );
    }
}