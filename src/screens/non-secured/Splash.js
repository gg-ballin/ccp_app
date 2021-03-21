import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, StatusBar, Platform, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/core';
import {Colors} from '../../theme/index';
import {connect} from 'react-redux';
import {LoginActions} from '../../redux/actions/index';
import moment from 'moment';

const logo = require('../../images/non-secured/logo_ccp.jpg');

const SplashScreen = ({expiresIn}) => {
    const navigation = useRef(useNavigation());
    const [date, setDate] = useState(new Date());
    const dateCompare = moment(date, 'YYYY-MM-DD');
    const parsedDateCompare = dateCompare.format('DD, MMM YYYY HH:mm:ss');
    // console.log('Expires in: ', expiresIn);
    // console.log('Fecha hoy: ', parsedDateCompare);
    useEffect(() => {
        // lottieRef.current.play(30, 180);
        const fetchToken = async () => {
            await AsyncStorage.getItem('accessToken').then((token) => {
                if (token) {
                    // arreglar esto
                    // if (parsedDateCompare > expiresIn) {
                    //     setTimeout(() => {
                    //         navigation.current.navigate('AUTH');
                    //     }, 1500);
                    // } else {
                    setTimeout(() => {
                        navigation.current.navigate('APP');
                    }, 1500);
                    // }
                } else {
                    setTimeout(() => {
                        navigation.current.navigate('AUTH');
                    }, 1500);
                }
            });
        };
        fetchToken();
    }, []);
    return (
        <View style={styles.container}>
            <Image source={logo} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Red,
    },
});
const mapStateToProps = (state) => ({
    expiresIn: state.login.expiresIn,
});

const mapDispatchToProps = (dispatch) => ({
    logout: (navigation) => {
        dispatch(LoginActions.logout(navigation));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
