import React from 'react';
import {Colors} from '../../theme/index';
import Feather from 'react-native-vector-icons/Feather';
import {View, StyleSheet, Modal, SafeAreaView} from 'react-native';
import Text from '../textfields/TextCustom';
import Button from '../buttons/Button';

export default ({visible, onDismiss, onPressClose, title, description}) => {
    return (
        <Modal
            animationType="slide"
            // presentationStyle="formSheet"
            visible={visible}
            onDismiss={() => onDismiss}>
            <View style={styles.ContainerModal}>
                <SafeAreaView />

                <View style={styles.ContainerHeaderTitle}>
                    <Text text={title} textStyle={styles.HeaderTitle} />
                </View>
                <View style={styles.containerCheck}>
                    <Feather name="check" size={130} color={Colors.White} />
                </View>
                <Text textStyle={styles.titleStyle} text={description} />
                <Button
                    style={styles.btnBack}
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
    btnBack: {
        height: 5,
        width: '90%',
        marginTop: 110,
    },
});
