/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    Modal,
    ActivityIndicator,
    Text,
} from 'react-native';
import {Colors} from '../../theme/index';
import Button from '../buttons/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const ModalInfo = ({loading, title, hasLoading, size, buttonTitle, onPressButton, colorTextBtn}) => {
    const checkSize = (modalSize) => {
        if (modalSize === 'small') {
            return '25%';
        } else if (modalSize === 'medium') {
            return '40%';
        } else if (modalSize === 'big') {
            return '85%';
        }
    };
    return (
        <View style={styles.containerModal}>
            <Modal
                animationType="slide"
                transparent
                modalVisible={loading}>
                <View style={styles.containerAll}>
                <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.onClose} />
                </TouchableWithoutFeedback>
                    <View style={[styles.containerButtons, {height: checkSize(size)}]}>
                    <View style={styles.containerContentModal}>
                    <Text  style={styles.textModal}>{title}</Text>
                    {!hasLoading ?
                    (<View style={{width: '75%'}}>
                        <Button onPress={onPressButton} title={buttonTitle} textStyle={{color: colorTextBtn}} />
                        </View> )
                    :
                        <ActivityIndicator
                            size="large"
                            color={Colors.DarkRed}
                        />
                    }
                    </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        position: 'absolute',
        opacity: 0.4,
        height: HEIGHT,
        width: WIDTH,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 12,
        backgroundColor: 'white',
    },
    containerAll: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    containerButtons: {
        backgroundColor: '#fff',
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 20,
    },
    containerContentModal: {
        height: '100%',
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textModal:{
        color: Colors.DarkRed,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default ModalInfo;
