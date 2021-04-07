import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Info = ({title, data}) => {
    return (
        <View style={{}}>
            <View style={{}}>
                <Text allowFontScaling={false} style={styles.titleInfo}>
                    {title}
                </Text>
            </View>
            <View style={{}}>
                <Text allowFontScaling={false} style={styles.infoDesc}>
                    {data}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleInfo: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
    },
    infoDesc: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
    },
});
export default Info;
