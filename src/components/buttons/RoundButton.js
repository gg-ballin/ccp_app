import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const RoundButton = ({
    onPress,
    iconName,
    iconColor,
    iconSize,
    style,
    buttonBackground,
}) => {
    return (
        <View
            style={[
                styles.container,
                style,
                {backgroundColor: buttonBackground},
            ]}>
            <TouchableOpacity onPress={onPress}>
                <Icon
                    name={iconName}
                    size={iconSize ? iconSize : 45}
                    color={iconColor}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 100,
        backgroundColor: '#fff',
    },
});

export default RoundButton;
