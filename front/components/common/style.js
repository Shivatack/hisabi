'use strict';
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
    textinput: {
        height: 40,
        fontSize: 24,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        padding: 5,
        minWidth: 300
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registrationcontainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginBottom: 30
    },
    birthdateselected: {
        color: 'black',
        fontSize: 24
    },
    birthdateunselected: {
        color: 'gray',
        fontSize: 24
    },
    horizontal: {
        flex: 1,
        maxHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        width: 300
    },
    vertical: {
        flex: 1,
        maxHeight: 200,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        width: 300
    },
    // BIRTHDAY SELECTION SECTION
    birthdayselect: {
        flex: 1,
        maxHeight: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        width: 300
    },
    birthdaytextinput: {
        height: 40,
        fontSize: 24,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: -5,
        padding: 5,
        minWidth: 255
    },
    datepicker: {
        width: 300,
        color: 'white'
    },
    calendaricon: {
        marginTop: -1,
        marginRight: -2
    }
});