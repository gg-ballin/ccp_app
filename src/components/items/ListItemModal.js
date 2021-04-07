import React from 'react';
import Input from '../inputs/Input';
import Text from '../textfields/TextCustom';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Colors} from '../../theme/index';

const ListItemModal = ({tipo, categoria, precio, pac, cant}) => {
    // debugger;
    const all = tipo && categoria && precio && pac;
    if (all) {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.texts}>
                        <Text
                            text={tipo ? tipo : '-'}
                            textStyle={{color: Colors.White}}
                        />

                        <Text
                            text={categoria ? categoria : '-'}
                            textStyle={{color: Colors.White}}
                        />

                        <Text
                            text={precio ? precio : '-'}
                            textStyle={{color: Colors.White}}
                        />

                        <Text
                            text={pac ? pac : '-'}
                            textStyle={{color: Colors.White}}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.texts}>
                        <Text
                            text={tipo ? tipo : '-'}
                            textStyle={{color: Colors.White}}
                        />

                        <Text
                            text={cant ? cant : '-'}
                            textStyle={{color: Colors.White}}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginLeft: 15,
        height: 55,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    texts: {
        justifyContent: 'space-around',
        // backgroundColor: 'red',
        flexDirection: 'row',
        width: '95%',
    },
    containerInputs: {
        // backgroundColor: 'red',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '50%',
    },
    inputs: {
        width: 65,
        borderWidth: 1,
        height: 45,
        color: Colors.Black,
    },
});

export default ListItemModal;
