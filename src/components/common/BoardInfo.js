import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Colors} from '../../theme';
import Text from '../textfields/TextCustom';

const BoardInfo = ({title, number, style, loading}) => {
    return (
        <View style={[styles.container, style]}>
            {!loading ? (
                <Text text={number} textStyle={styles.number} />
            ) : (
                <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={styles.number}
                />
            )}

            <View style={styles.titleContainer}>
                <Text text={title} textStyle={styles.title} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.DarkRed,
        height: 85,
        justifyContent: 'center',
        alignItems: 'center',
        width: 105,
        borderRadius: 15,
    },
    number: {
        fontFamily: 'Poppins-SemiBold',
        color: Colors.White,
        fontSize: 24,
        bottom: 5,
    },
    titleContainer: {
        backgroundColor: Colors.White,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Poppins-Regular',
        color: Colors.Black,
    },
});

export default BoardInfo;
