import React from 'react';
import {Colors} from '../../theme/index';
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    Text,
} from 'react-native';
// import Text from '../textfields/TextCustom';
import Button from '../buttons/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default ({
    button,
    textButton,
    children,
    onPress,
    onCloseModal,
    title,
    modalVisible,
    height,
}) => {
    return (
        <View style={styles.containerModal}>
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.containerAll}>
                    <TouchableWithoutFeedback onPress={() => onCloseModal}>
                        <View style={styles.onClose} />
                    </TouchableWithoutFeedback>
                    <View style={[styles.containerButtons, {height: height}]}>
                        <View style={styles.grayRectangle} />
                        <View style={styles.containerContentModal}>
                            <View style={styles.containerHeaderModal}>
                                <Text style={styles.titleItemModal}>
                                    {title}
                                </Text>
                                {button ? (
                                    <Button
                                        title={
                                            textButton
                                                ? textButton
                                                : 'Finalizar'
                                        }
                                        style={styles.ButtonStyles}
                                        textStyle={styles.textStyle}
                                        onPress={onPress}
                                    />
                                ) : null}
                            </View>
                            {children}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
    onClose: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity: 0.48,
        backgroundColor: '#17171a',
    },
    containerButtons: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
    },
    grayRectangle: {
        width: 40,
        height: 5,
        backgroundColor: '#d9d9d9',
        marginTop: 8,
        borderRadius: 10,
    },
    containerContentModal: {
        width: '90%',
        marginTop: 35,
    },
    containerHeaderModal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pickerContainer: {
        width: '90%',
    },
    pickerStyles: {
        backgroundColor: Colors.Gray,
        borderRadius: 12,
    },
    titleItemModal: {
        fontFamily: 'Poppins-SemiBold',
        color: Colors.Black,
        fontSize: 20,
    },
    ButtonStyles: {
        backgroundColor: Colors.White,
        width: 105,
        shadowOffset: {
            width: null,
            height: null,
        },
        shadowColor: null,
        shadowRadius: null,
        shadowOpacity: null,
    },
    textStyle: {
        color: Colors.Red,
        textDecorationLine: 'underline',
    },
});
