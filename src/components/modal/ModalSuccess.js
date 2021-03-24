import React from 'react';
import {Colors} from '../../theme/index';
import Feather from 'react-native-vector-icons/Feather';
import {View, StyleSheet, Modal, SafeAreaView, Text} from 'react-native';
// import Text from '../textfields/TextCustom';
import Button from '../buttons/Button';

export default ({visible, onDismiss, onPressClose, title}) => {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            onDismiss={() => onDismiss}>
            <View style={styles.ContainerModal}>
                <SafeAreaView />

                <View style={styles.ContainerHeaderTitle}>
                    <Text style={styles.HeaderTitle}>{title}</Text>
                </View>
                <View style={styles.containerCheck}>
                    <Feather name="check" size={130} color={Colors.White} />
                </View>
                <Text style={styles.titleStyle}>
                    ¡Compra realizada correctamente!
                </Text>
                <Button
                    style={{height: 5, width: '90%', marginTop: 110}}
                    textStyle={{color: Colors.White}}
                    title="Finalizar"
                    onPress={onPressClose}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    ContainerModal: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
    },
    containerCheck: {
        backgroundColor: Colors.Green,
        alignItems: 'center',
        borderWidth: 1,
        height: 130,
        width: 130,
        borderRadius: 130 / 2,
        justifyContent: 'center',
    },
    Header: {
        height: 90,
        width: '90%',
    },
    ContainerHeaderTitle: {
        alignItems: 'center',
    },
    titleStyle: {
        marginTop: 60,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 35,
        textAlign: 'center',
    },
    HeaderTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
    },
});
