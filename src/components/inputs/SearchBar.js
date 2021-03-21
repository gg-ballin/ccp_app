import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../theme/index';

export default ({title, value, onChangeText}) => {
    return (
        <View style={styles.searchSection}>
            {title ? <Text style={styles.titleSearch}>{title}</Text> : null}
            <View style={styles.searchBar}>
                <Icon
                    name="search"
                    style={styles.searchIcon}
                    size={20}
                    color="#000"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Buscar"
                    value={value}
                    onChangeText={onChangeText()}
                    placeholderTextColor={Colors.DarkGrey}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchSection: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    titleSearch: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        marginBottom: 10,
    },
    searchBar: {
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
        color: '#424242',
        fontFamily: 'Poppins-Regular',
    },
});
