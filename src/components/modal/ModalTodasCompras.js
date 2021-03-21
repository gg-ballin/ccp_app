import React from 'react';
import {Colors} from '../../theme/index';
import Feather from 'react-native-vector-icons/Ionicons';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
    SafeAreaView,
} from 'react-native';
import Text from '../textfields/TextCustom';
import BoardInfo from '../common/BoardInfo';
import Info from './InfoModal';
import {connect} from 'react-redux';

const ModalTodasCompras = ({
    visible,
    onDismiss,
    onPressClose,
    pedidosTodosItemSelected,
}) => {
    console.log('pedidosTodosItemSelected: ', pedidosTodosItemSelected);
    const item = pedidosTodosItemSelected;
    console.log('item: ', item);
    const handleIconText = (name) => {
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
        <Modal
            animationType="slide"
            presentationStyle="pageSheet"
            visible={visible}
            onRequestClose={() => onDismiss}
            onDismiss={() => onDismiss}>
            <View style={styles.ContainerModal}>
                <SafeAreaView />
                <View style={styles.Header}>
                    <TouchableOpacity onPress={onPressClose}>
                        <Feather name="close" size={30} />
                    </TouchableOpacity>
                    <View style={styles.ContainerHeaderTitle}>
                        <Text
                            text="Detalle de la compra"
                            textStyle={styles.HeaderTitle}
                        />
                    </View>
                </View>
                <View style={styles.containerFirstInfo}>
                    <BoardInfo
                        number={item.Cantidad}
                        title="Cabezas"
                        style={{borderWidth: 3}}
                    />
                    <View style={styles.profileCircleText}>
                        <Text
                            text={handleIconText(item.Remitente)}
                            style={styles.textIconStyle}
                        />
                    </View>
                    {item.TipoCompra === 'Al Rinde' ? (
                        <BoardInfo
                            number={'Al rinde'}
                            title=""
                            style={{borderWidth: 3}}
                        />
                    ) : (
                        <BoardInfo
                            number={item.Peso}
                            title="KG"
                            style={{borderWidth: 3}}
                        />
                    )}
                </View>
                <View style={styles.containerSecondInfo}>
                    <Info
                        title="Fecha de compra:"
                        data={item.FechaCompra.slice(0, 10)}
                    />
                    <View style={{width: '50%', paddingLeft: 10}}>
                        <Info
                            title="Fecha de entrega:"
                            data={item.Fecha.slice(0, 10)}
                        />
                    </View>
                </View>
                <View style={styles.containerSecondInfo}>
                    <Info title="Remitente:" data={item.Remitente} />
                    <View style={{width: '50%', paddingLeft: 10}}>
                        <Info title="Destino:" data={item.Destino} />
                    </View>
                </View>
                <View style={styles.containerSecondInfo}>
                    <Info title="Comprador:" data={item.Comprador} />
                    <View style={{width: '50%'}} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    ContainerModal: {
        alignItems: 'center',
        marginTop: 10,
    },
    Header: {
        height: 90,
        // backgroundColor: 'red',
        width: '90%',
    },
    ContainerHeaderTitle: {
        // backgroundColor: 'green',
        alignItems: 'center',
    },
    HeaderTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
    },
    profileCircleText: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.Red,
        // borderWidth: 2,
        // marginTop: 40,
        width: 85,
        height: 85,
        borderRadius: 85 / 2,
    },
    textIconStyle: {
        color: Colors.Orange,
        fontSize: 25,
        fontFamily: 'Poppins-SemiBold',
    },
    containerFirstInfo: {
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'red',
        justifyContent: 'space-evenly',
    },
    containerSecondInfo: {
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        // backgroundColor: 'blue',
        justifyContent: 'space-between',
    },
});
const mapStateToProps = (state) => ({
    pedidosTodosItemSelected: state.orders.pedidosTodosItemSelected,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ModalTodasCompras);
