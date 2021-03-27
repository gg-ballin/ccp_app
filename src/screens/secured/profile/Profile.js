import React, {useState} from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    SafeAreaView,
    Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import BoardInfo from '../../../components/common/BoardInfo';
import TileItem from '../../../components/items/TileItem';
// import Text from '../../../components/textfields/TextCustom';
import {Colors} from '../../../theme';
import {connect} from 'react-redux';

const ProfileScreen = ({userData}) => {
    const buildName = (name) => {
        if (name) {
            let avatarText;
            let newName = name.split(' ');
            let firstName = newName[0];
            let lastName = newName[1];
            console.log('First Name: ', firstName[0]);
            console.log('last Name: ', lastName[0]);
            return (avatarText = firstName[0] + lastName[0]);
        }
    };
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <View style={styles.profileCircleText}>
                <Text style={styles.textIconStyle}>
                    {buildName(userData.nombre)}
                </Text>
            </View>
            <View style={styles.containerInfo}>
                <TileItem title="Nombre completo" text={userData.nombre} />
                <TileItem title="Nombre de usuario" text={userData.username} />
                <TileItem title="E-mail" text={userData.mail} />
            </View>
            <View style={styles.containerBoardInfo}>
                <BoardInfo number="0" title="$ Promedio" />
                <BoardInfo number="0" title="$ Anual" />
                <BoardInfo number="0" title="$ Flete" />
            </View>
            <View style={styles.containerMensajes}>
                <Text style={styles.mensajes}>Próximamente: Mensajes</Text>
                <Feather name="message-circle" size={25} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {height: -2, width: 0},
        shadowRadius: 1,
        shadowOpacity: 0.2,
        backgroundColor: '#730F00',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    profileCircleText: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.White,
        borderWidth: 2,
        marginTop: 40,
        width: 110,
        height: 110,
        borderRadius: 110 / 2,
    },
    textIconStyle: {
        color: Colors.Orange,
        fontSize: 25,
        fontFamily: 'Poppins-SemiBold',
    },
    containerInfo: {
        width: '100%',
        marginTop: 25,
    },
    containerBoardInfo: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        justifyContent: 'space-around',
    },
    containerMensajes: {
        backgroundColor: Colors.White,
        width: '100%',
        height: 80,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mensajes: {
        color: Colors.Black,
        fontSize: 22,
        fontFamily: 'Poppins-SemiBold',
    },
});

const mapStateToProps = (state) => ({
    userData: state.login.userData,
});

export default connect(mapStateToProps)(ProfileScreen);
