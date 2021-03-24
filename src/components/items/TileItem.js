import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../../theme';
// import Text from '../textfields/TextCustom';

export default ({title, text}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
            <View style={styles.Separator} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        color: Colors.White,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
    },
    Separator: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.Hint,
        marginTop: 10,
    },
});
