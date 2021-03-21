import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../theme/index';

export default ({...props}) => {
    return (
        <TouchableOpacity
            style={[styles.searchSection]}
            disabled={props.disabled}
            onPress={() => props.onPress()}>
            {props.title ? (
                <Text style={styles.titleSearch}>{props.title}</Text>
            ) : null}
            <View style={styles.searchBar}>
                <Icon
                    name="search"
                    style={styles.searchIcon}
                    size={20}
                    color="#000"
                />
                <Text style={styles.input}>
                    {props.searched ? props.searched : 'Buscar'}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    searchSection: {
        // backgroundColor: 'pink',
        width: '100%',
        // paddingLeft: 15,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    titleSearch: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        marginBottom: 10,
    },
    searchBar: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        // backgroundColor: 'red',
        color: '#424242',
        fontFamily: 'Poppins-Regular',
    },
});
