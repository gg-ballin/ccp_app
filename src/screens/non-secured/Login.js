/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    SafeAreaView,
    Platform,
    Image,
    Dimensions,
    TextInput,
} from 'react-native';
import Button from '../../components/buttons/Button';
import {Colors} from '../../theme/index';
import {connect} from 'react-redux';
import Text from '../../components/textfields/TextCustom';
import LoginActions from '../../redux/actions/login';
import {useNavigation} from '@react-navigation/core';
import Loading from '../../components/common/ModalInfo';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const Login = ({
    loginEmail,
    loginPassword,
    setLoginEmail,
    setLoginPassword,
    error,
    loading,
    executeLogin,
}) => {
    const navigation = useNavigation();
    const logo = require('../../images/non-secured/logo_ccp.jpg');
    const handleLoading = () => {
        if (loading) {
            return (
                <Loading loading={loading} hasLoading={true} title="Ingresando" size="small"/>
            );
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <SafeAreaView style={{flex:1}} />
            <Image source={logo} style={styles.logoStyle} />
            <View style={styles.fields}>
                <TextInput
                    placeholder=" Usuario"
                    autoFocus
                    value={loginEmail}
                    autoCorrect={false}
                    keyboardType="email-address"
                    style={styles.textInputStyles}
                    onChangeText={(text) => setLoginEmail(text)}
                />
                <View style={{height: 25}} />
                <TextInput
                    style={styles.textInputStyles}
                    placeholder=" Contraseña"
                    value={loginPassword}
                    onChangeText={(text) => setLoginPassword(text)}
                    secureTextEntry
                />
                {error ? (
                    <View>
                        <Text
                            text="Credenciales incorrectas"
                            textStyle={styles.errorMsg}/>
                    </View>
                    ) : null}
                <Button
                    style={styles.flatButton}
                    textStyle={styles.textButton}
                    title="Ingresar"
                    onPress={() => {
                        executeLogin(loginEmail, loginPassword, navigation);
                    }}
                />
            </View>
            {handleLoading()}
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Red,
    },
    containerModal: {
        position: 'absolute',
        opacity: 0.76,
        height: HEIGHT,
        width: WIDTH,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 12,
    },
    containerAll: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    containerButtons: {
        width: '100%',
        // el height que determina el largo del modal es este
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: '20%',
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent:'center',
    },
    containerContentModal: {
        width: '90%',
        // marginTop: 35,
        height: 105,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor: 'green',
    },
    textModal:{
        color: Colors.DarkRed,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
    },
    onClose: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity: 0.48,
        backgroundColor: Colors.Hint,
    },
    logoStyle: {
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? 20 : null,
        marginBottom: Platform.OS === 'ios' ? 10 : null,
    },
    errorMsg: {
        color: Colors.White,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        marginTop: 15,
    },
    flatButton: {
        width: '90%',
        marginTop: 20,
        backgroundColor: Colors.DarkGrey,
    },
    fields: {
        flex: 1,
        minHeight: 140,
        alignItems: 'center',
    },
    textButton: {
        color: Colors.White,
    },
    textInputStyles: {
        backgroundColor: 'white',
        borderRadius: 12,
        fontFamily: 'Poppins-Regular',
        color: Colors.Red,
        height: 50,
        padding: 15,
        width: '90%',
    },
});

const mapStateToProps = (state) => ({
    loginEmail: state.login.loginEmail,
    loginPassword: state.login.loginPassword,
    loggedStatus: state.login.loggedStatus,
    loading: state.login.loading,
    error: state.login.error,
});

const mapDispatchToProps = (dispatch) => ({
    executeLogin: (email, password, navigation) => {
        dispatch(LoginActions.executeLogin(email, password, navigation));
    },
    setLoginEmail: (email) => {
        dispatch(LoginActions.setLoginEmail(email));
    },
    setLoginPassword: (password) => {
        dispatch(LoginActions.setLoginPassword(password));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
