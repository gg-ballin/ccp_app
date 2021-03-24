import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../../theme';

const Button = ({flat, style, disabled, title, textStyle, onPress, icon}) => {
    return (
        <TouchableOpacity
            style={
                flat
                    ? {...styles.button, ...style}
                    : {...styles.buttonFlat, ...style}
            }
            disabled={disabled}
            onPress={() => onPress()}>
            {/* {!icon && ( */}
            <Text style={{...styles.text, ...textStyle}}>{title}</Text>
            {/* // )} */}
            {icon ? <FontAwesome style={styles.icon} name={icon} /> : null}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderRadius: 28,
        maxHeight: 40,
        minHeight: 40,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        shadowColor: '#fff',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 2,
        shadowOpacity: 0.2,
    },
    buttonFlat: {
        backgroundColor: Colors.Red,
        borderRadius: 20,
        maxHeight: 50,
        minHeight: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 1,
        shadowOpacity: 0.2,
    },
    text: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
    },
    icon: {
        fontSize: 20,
        color: '#fff',
    },
});
export default Button;
