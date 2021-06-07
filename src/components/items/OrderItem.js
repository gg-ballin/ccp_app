/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';
import {Colors} from '../../theme/index';
// import Text from '../textfields/TextCustom';

const OrderItem = ({
    title,
    description,
    date,
    kg,
    isAlRinde,
    iconText,
    iconType,
    onPress,
    cbzs,
}) => {
    let leftComponent = null;
    switch (iconType) {
        case 'text':
            leftComponent = <Text style={styles.iconText}>{iconText}</Text>;
            break;
        default:
            leftComponent = <Text style={styles.iconText}>{iconText}</Text>;
            break;
    }
    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress()}>
            <View style={styles.containerLeftComponent}>
                <View
                    style={[
                        styles.IconContainer,
                        {backgroundColor: Colors.Red},
                    ]}>
                    {leftComponent}
                </View>
            </View>
            <View style={styles.TextContainer}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <Text style={styles.principal}>{description}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.secundario}>{cbzs + ' Cbzas'}</Text>
                    <View style={{width: 40}} />
                    {/* ESTE ES EL QUE HAY QUE CAMBIAR CON AL RINDE */}
                    {isAlRinde ? (
                        <Text style={styles.secundario}>{'Al Rinde'}</Text>
                    ) : (
                        <Text style={styles.secundario}>{kg + ' Kg'}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        backgroundColor: Colors.White,
        borderRadius: 12,
        padding: 5,
    },
    containerLeftComponent: {
        // backgroundColor: 'yellow',
    },
    IconContainer: {
        width: 54,
        height: 54,
        borderRadius: 27,
        borderWidth: 1,
        marginTop: Platform.OS === 'ios' ? 5 : 9,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 12,
    },
    iconText: {
        fontSize: 19,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        textTransform: 'uppercase',
    },
    TextContainer: {
        paddingLeft: 10,
        // backgroundColor: 'green',
        // width: '75%',
    },
    titlesContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    title: {
        color: Colors.Black,
        marginBottom: 2.5,
        fontSize: 16,
        width: Platform.OS === 'ios' ? '45%' : '50%',
        // backgroundColor: 'yellow',
        textTransform: 'capitalize',
        fontFamily: 'Poppins-SemiBold',
    },
    date: {
        width: '40%',
        color: Colors.Black,
        textDecorationLine: 'underline',
        textDecorationStyle: 'double',
        fontFamily: 'Poppins-Regular',
    },
    principal: {
        // fontSize: 18,
        color: Colors.Black,
        marginBottom: 2.5,
        textTransform: 'capitalize',
        fontFamily: 'Poppins-Regular',
    },
    secundario: {
        // fontSize: 12,
        color: Colors.Hint,
        fontFamily: 'Poppins-Regular',
    },
});

export default OrderItem;
