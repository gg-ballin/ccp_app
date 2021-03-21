/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../theme/index';

export default ({onPress, title}) => {
    return (
        <View
            style={[
                styles.Header,
                {marginTop: Platform.OS === 'android' ? 15 : null},
            ]}>
            <TouchableOpacity onPress={onPress}>
                <Icon name="arrow-left" size={35} color={Colors.White} />
            </TouchableOpacity>
            <Text style={styles.Title}>{title}</Text>
            <View style={{width: 35}} />
        </View>
    );
};

const styles = StyleSheet.create({
    Header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    Title: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        fontSize: 30,
    },
});
