import React from 'react';
import Text from '../textfields/TextCustom';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../theme/index';
import Button from '../buttons/Button';

const ListItem = ({
    tipo,
    categoria,
    precio,
    precioPactado,
    cantidad,
    onPress,
}) => {
    if (precioPactado && cantidad) {
        return (
            <View style={styles.container}>
                <View style={styles.texts}>
                    <Text text={tipo} />
                    <Text style={{marginLeft: 15}} text={categoria} />
                    <Text text={precio + ' |'} />
                </View>
                <View style={styles.containerEditBtnSmall}>
                    <View style={styles.containerNewData}>
                        <View style={styles.newItem}>
                            <Text text={'$ Pac'} style={styles.title} />
                            <Text text={precioPactado} />
                        </View>
                        <View style={styles.newItem}>
                            <Text text={'Cant.'} style={styles.title} />
                            <Text text={cantidad} />
                        </View>
                        <Button
                            title="E"
                            style={styles.editBtnSmall}
                            textStyle={{color: Colors.White}}
                            onPress={() => onPress()}
                        />
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.texts}>
                    <Text text={tipo} />
                    <Text style={{marginLeft: 15}} text={categoria} />
                    <Text text={precio} />
                </View>
                <View style={styles.containerEditBtn}>
                    <Button
                        title="Editar"
                        style={styles.editBtnBig}
                        textStyle={{color: Colors.White}}
                        onPress={() => onPress()}
                    />
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 15,
        height: 65,
        alignItems: 'center',
    },
    texts: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '50%',
    },
    containerEditBtn: {
        // backgroundColor: 'red',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '50%',
        // alignItems: 'center',
    },
    editBtnBig: {
        width: 85,
        borderWidth: 0,
        height: 45,
        color: Colors.Black,
    },
    containerEditBtnSmall: {
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '70%',
        height: '100%',
        // borderWidth: 1,
        alignItems: 'flex-end',
    },
    editBtnSmall: {
        width: 30,
        borderWidth: 0,
        height: 15,
        color: Colors.Black,
    },
    containerNewData: {
        // backgroundColor: 'green',
        flexDirection: 'row',
        width: '60%',
        height: '85%',
        justifyContent: 'space-between',
        marginLeft: 15,
    },
    newItem: {
        backgroundColor: 'white',
    },
    title: {
        fontFamily: 'Poppins-Medium',
        color: Colors.Black,
    },
});

export default ListItem;
