import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Colors} from '../../theme/index';

export default (keyboardType, numberOfLines, placeholder, style) => {
    return (
        <TextInput
            placeholderTextColor="#cecece"
            keyboardType={keyboardType}
            numberOfLines={numberOfLines}
            textAlignVertical="bottom"
            placeholder={placeholder}
            style={{...styles.input, ...style}}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 12,
        fontFamily: 'Poppins-Regular',
        color: Colors.Red,
        height: 50,
        padding: 15,
        width: '90%',
    },
});
