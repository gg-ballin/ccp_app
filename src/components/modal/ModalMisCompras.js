import React from 'react';
import {Colors} from '../../theme/index';
import Feather from 'react-native-vector-icons/Ionicons';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
    SafeAreaView,
    ScrollView,
    FlatList,
    Image,
    Platform,
    Dimensions,
} from 'react-native';
import Text from '../textfields/TextCustom';
import BoardInfo from '../common/BoardInfo';
import ListItemModal from '../items/ListItemModal';
import Info from './InfoModal';
import {connect} from 'react-redux';

const ModalMisCompras = ({
    visible,
    onDismiss,
    onPressClose,
    pedidosUserItemSelected,
}) => {
    const item = pedidosUserItemSelected;
    const handleIconText = (name) => {
        if (!name) {
            let avatarText;
            let newName = name.split(' ');
            let firstName = newName[0];
            let lastName = newName[1];
            return (avatarText = firstName[0] + lastName[0]);
        }
    };
    const handleTipoCompra = () => {
        if (item.TipoCompra === 'Kg Vivo') {
            const arrPDetail = item.PedidoDetalles;
            return (
                <View style={styles.containerFirstInfo}>
                    {arrPDetail.map((item) => (
                        <View
                            style={{
                                alignItems: 'center',
                                backgroundColor: Colors.Hint,
                                marginBottom: 15,
                                borderRadius: 10,
                                flexDirection: 'column',
                            }}>
                            <Text
                                text={item.AnimalTipo}
                                textStyle={{
                                    fontFamily: 'Poppins-SemiBold',
                                    fontSize: 20,
                                    color: Colors.White,
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <BoardInfo
                                    number={item.Cantidad}
                                    title="Cantidad"
                                    style={{borderWidth: 3}}
                                />
                                <View style={{width: 8}} />
                                <BoardInfo
                                    number={item.Peso}
                                    title="KG"
                                    style={{borderWidth: 3}}
                                />
                                <View style={{width: 8}} />
                                <BoardInfo
                                    number={item.PrecioPactado}
                                    title="$"
                                    style={{borderWidth: 3}}
                                />
                            </View>
                        </View>
                    ))}
                </View>
            );
        } else {
            const arrPDetailL = item.PedidoDetalles;
            console.log('arrPDetailL: ', arrPDetailL);
            return (
                <View style={{width: '100%', alignItems: 'center'}}>
                    <View style={styles.grid}>
                        <View style={styles.gridTitles}>
                            <Text text="Tipo" style={styles.titleGrid} />
                            <Text text="Cat." style={styles.titleGrid} />
                            <Text text="$" style={styles.titleGrid} />
                            <Text text="Pre. Pac." style={styles.titleGrid} />
                        </View>
                        <ScrollView style={{width: '100%'}}>
                            {arrPDetailL.map((arr) =>
                                arr.PedidoDetallePedidoDetalleTipoParametros.map(
                                    (item2) => {
                                        let par =
                                            item2.PedidoDetalleTipoParametro;
                                        return (
                                            <ListItemModal
                                                tipo={par.AnimalTipo}
                                                categoria={par.Categoria}
                                                precio={par.Precio}
                                                pac={item2.PrecioPactado}
                                                cant={item2.Cantidad}
                                            />
                                        );
                                    },
                                ),
                            )}
                        </ScrollView>
                    </View>
                    <View style={styles.gridNew}>
                        <View style={styles.gridTitles}>
                            <Text text="Animal" style={styles.titleGrid} />
                            <Text text="Cantidad" style={styles.titleGrid} />
                        </View>
                        <ScrollView style={{width: '100%'}}>
                            {arrPDetailL.map((detail) => {
                                debugger;
                                return (
                                    <ListItemModal
                                        tipo={detail.AnimalTipo}
                                        cant={detail.Cantidad}
                                    />
                                );
                            })}
                        </ScrollView>
                    </View>
                </View>
            );
        }
    };
    const handleTipoCompraName = () => {
        if (item.TipoCompra === 'Kg Vivo') {
            return item.TipoCompra.slice(0, 10);
        } else {
            return 'Al Rinde';
        }
    };
    console.log('pedidosUserItemSelected', pedidosUserItemSelected);
    return (
        <Modal
            animationType="slide"
            presentationStyle="pageSheet"
            visible={visible}
            onRequestClose={() => onDismiss}
            onDismiss={() => onDismiss}>
            <ScrollView>
                <View style={styles.ContainerModal}>
                    <SafeAreaView />
                    <View style={styles.Header}>
                        <TouchableOpacity onPress={onPressClose}>
                            <Feather name="close" size={30} />
                        </TouchableOpacity>
                        <View style={styles.ContainerHeaderTitle}>
                            <Text
                                text="Detalle de mi compra"
                                textStyle={styles.HeaderTitle}
                            />
                        </View>
                    </View>

                    <View style={styles.containerSecondInfo}>
                        <Info
                            title="Tipo de compra:"
                            data={handleTipoCompraName()}
                        />
                        <View style={{width: '50%', paddingLeft: 10}}>
                            <Info
                                title="Fecha de entrega:"
                                data={item.FechaCompra.slice(0, 10)}
                            />
                        </View>
                    </View>
                    {handleTipoCompra()}
                    <View style={styles.containerSecondInfo}>
                        <Info title="Remitente:" data={item.Remitente} />
                        <View style={{width: '50%', paddingLeft: 10}}>
                            <Info title="Destino:" data={item.Destino} />
                        </View>
                    </View>
                    <View style={styles.containerSecondInfo}>
                        <Info title="Comprador:" data={item.Comprador} />
                        <View style={{width: '50%', paddingLeft: 10}}>
                            <Info
                                title="Fecha de llegada:"
                                data={item.Fecha.slice(0, 10)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
};
const styles = StyleSheet.create({
    ContainerModal: {
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    Header: {
        height: 90,
        width: '90%',
    },
    ContainerHeaderTitle: {
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
        flexDirection: 'column',
        width: '100%',
        marginTop: 15,
        justifyContent: 'space-evenly',
    },
    containerSecondInfo: {
        flexDirection: 'row',
        marginTop: 15,
        width: '90%',
        justifyContent: 'space-between',
    },
    grid: {
        backgroundColor: Colors.Hint,
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 5,
        borderRadius: 15,
        height: 250,
        width: '85%',
    },
    gridNew: {
        backgroundColor: Colors.Hint,
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 5,
        borderRadius: 15,
        height: 125,
        width: '85%',
    },
    gridTitles: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        borderBottomColor: Colors.White,
        borderBottomWidth: 1,
    },
    titleGrid: {
        fontFamily: 'Poppins-Medium',
        color: Colors.White,
    },
});

const mapStateToProps = (state) => ({
    pedidosUserItemSelected: state.orders.pedidosUserItemSelected,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMisCompras);
