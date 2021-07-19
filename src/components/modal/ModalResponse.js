import React from 'react';
import {Colors} from '../../theme/index';
import Feather from 'react-native-vector-icons/Feather';
import {
    View,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Text,
    Dimensions,
    Image,
} from 'react-native';
import Button from '../buttons/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const success = require('../../images/secured/Success.png');
const ModalResponse = ({
    loading,
    title,
    error,
    size,
    buttonTitle,
    onPressButton,
    colorTextBtn,
}) => {
    const checkSize = (modalSize) => {
        if (modalSize === 'small') {
            return '25%';
        } else if (modalSize === 'medium') {
            return '40%';
        } else if (modalSize === 'big') {
            return '85%';
        } else if (modalSize === 'full') {
            return '100%';
        }
    };
    const newLocal = '25%';

    return (
        <View style={styles.containerModal}>
            <Modal animationType="slide" transparent modalVisible={loading}>
                <View style={styles.containerAll}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.onClose} />
                    </TouchableWithoutFeedback>
                    <View
                        style={[
                            styles.containerButtons,
                            {height: size ? checkSize(size) : newLocal},
                        ]}>
                        <View style={styles.containerContentModal}>
                            <View />
                            <View style={styles.containerSuccess}>
                                <Image source={success} />
                                <Text style={styles.textModal}>{title}</Text>
                                <Text style={styles.subModal}>
                                    Vas a poder ver tu nueva compra en la
                                    sección Compras
                                </Text>
                            </View>
                            <View style={{width: '75%'}}>
                                <Button
                                    onPress={onPressButton}
                                    title={buttonTitle}
                                    textStyle={{color: colorTextBtn}}
                                />
                            </View>
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
    containerSuccess: {
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    textModal: {
        color: Colors.DarkRed,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        marginTop: 40,
        textAlign: 'center',
    },
    subModal: {
        color: Colors.DarkRed,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
    },
});

export default ModalResponse;
