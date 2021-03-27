/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    SafeAreaView,
    Platform,
    Dimensions,
    FlatList,
    Animated,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Text,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
    responsiveHeight,
    responsiveFontSize,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import useAnimatedOpacity from '../../../hooks/useAnimatedOpacity';
import Button from '../../../components/buttons/Button';
import OrderItem from '../../../components/items/OrderItem';
import SearchBar from '../../../components/inputs/SearchBar';

import {Colors} from '../../../theme';
import ModalMisCompras from '../../../components/modal/ModalMisCompras';
import ModalTodasCompras from '../../../components/modal/ModalTodasCompras';
import {
    OrderActions,
    Section1Actions,
    Section2Actions,
    Section3Actions,
    Section4Actions,
    Section5Actions,
} from '../../../redux/actions';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const OrdersScreen = ({
    setSection,
    loading,
    compras,
    mis_compras,
    setCompras,
    setMyCompras,
    // getters
    getRemitentes,
    getProvincias,
    getPlazos,
    getAnimales,
    getPedidoDetalleTipoParametro,
    getComisionistas,
    getDestinos,
    getTransportes,
    getTransporteTipo,
    getPedidosTodos,
    // pedidos
    pedidosTodos,
    setSelectedItemPedidosTodos,
    setSelectedItemPedidosByUser,
    pedidosUser,
    // token
    accessToken,
    navigation,
}) => {
    const animLine = useState(new Animated.Value(0))[0];
    const [selected, setSelected] = useState(0);
    const [opacity, animateOpacity, opacityValue] = useAnimatedOpacity();
    const [modalMisCompras, setModalMisCompras] = useState(false);
    const [modalTodasCompras, setmodalTodasCompras] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    useFocusEffect(
        React.useCallback(() => {
            // setSelected(0);
            animateOpacity({duration: 300, delay: 100});
            return () => {
                opacityValue.setValue(0);
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
    );

    useEffect(() => {
        animatedLine();
    }, [selected]);

    const animatedLine = () => {
        Animated.spring(animLine, {
            toValue: selected === 0 ? 0 : 1,
            useNativeDriver: true,
        }).start();
    };
    const translateX = animLine.interpolate({
        inputRange: [0, 1],
        outputRange: [0, responsiveWidth(50)],
        extrapolate: 'clamp',
    });

    const translateTodas = animLine.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -responsiveWidth(100)],
    });

    const translateMisCompras = animLine.interpolate({
        inputRange: [0, 1],
        outputRange: [responsiveWidth(100), 0],
    });

    const buildIconText = (text) => {
        let textName = text;
        return textName.charAt(0);
    };
    const parseDate = (date) => {
        let fecha = date.slice(0, 10);
        return fecha;
    };
    const handleComprasItem = ({item}) => {
        let isAlRinde = item.TipoCompra === 'Al Rinde';
        return (
            <OrderItem
                title={item.Destino}
                description={item.Remitente}
                kg={item.Peso}
                cbzs={item.Cantidad}
                iconType="text"
                isAlRinde={isAlRinde}
                iconText={buildIconText(item.Destino)}
                date={parseDate(item.Fecha)}
                onPress={() => {
                    setSelectedItemPedidosTodos(item);
                    setmodalTodasCompras(true);
                }}
            />
        );
    };
    const handleMisComprasItem = ({item}) => {
        // getPedidosTodos(accessToken);
        let isAlRinde = item.TipoCompra === 'Al Rinde';
        return (
            <OrderItem
                title={item.Destino}
                description={item.Remitente}
                kg={item.Peso}
                cbzs={item.Cantidad}
                iconType="text"
                isAlRinde={isAlRinde}
                iconText={buildIconText(item.Destino)}
                date={parseDate(item.Fecha)}
                onPress={() => {
                    setSelectedItemPedidosByUser(item);
                    setModalMisCompras(true);
                }}
            />
        );
    };
    const handleTitles = () => {
        return (
            <View style={styles.options}>
                <TouchableWithoutFeedback
                    style={[styles.handler, {backgroundColor: 'blue'}]}
                    onPress={() => setSelected(0)}>
                    <View style={styles.handlerContent}>
                        <Text style={styles.txtHandler}>TODAS</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    style={styles.handler}
                    onPress={() => setSelected(1)}>
                    <View style={styles.handlerContent}>
                        <Text style={styles.txtHandler}>MIS COMPRAS</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };
    const handleLine = () => {
        return (
            <View style={styles.containerLine}>
                <View style={styles.line}>
                    <Animated.View
                        style={[
                            styles.selectedLine,
                            {
                                transform: [{translateX}],
                            },
                        ]}
                    />
                </View>
            </View>
        );
    };
    const handleCompras = () => {
        // console.log('loading: ', loading);
        return (
            <View style={styles.containerContent}>
                <View style={{width: '80%'}}>
                    <SearchBar
                        value={compras}
                        onChangeText={(text) => setCompras(text)}
                    />
                </View>
                <View style={{height: 15}} />
                <Text
                    style={{
                        color: Colors.White,
                        fontFamily: 'Poppins-SemiBold',
                    }}>
                    {pedidosTodos.length > 0
                        ? `Cantidad de compras: ${pedidosTodos.length}`
                        : 'Cantidad de compras: -'}
                </Text>
                {loading ? (
                    <View>
                        <View style={{height: 15}} />
                        <ActivityIndicator size="large" color={Colors.White} />
                    </View>
                ) : (
                    <FlatList
                        maxToRenderPerBatch={15}
                        style={{width: '100%', marginBottom: 15}}
                        data={pedidosTodos}
                        // refreshControl={
                        //     <RefreshControl
                        //     refreshing={refreshing} onRefresh={getPedidosTodos(accessToken)} />
                        //   }
                        renderItem={handleComprasItem}
                    />
                )}
            </View>
        );
    };
    const handleMisCompras = () => {
        return (
            <View style={styles.containerContent}>
                <View style={{width: '80%'}}>
                    <SearchBar
                        value={mis_compras}
                        onChangeText={(text) => setMyCompras(text)}
                    />
                </View>
                <View style={{height: 15}} />
                <Text
                    style={{
                        color: Colors.White,
                        fontFamily: 'Poppins-SemiBold',
                    }}>
                    {pedidosTodos.length > 0
                        ? `Cantidad de compras: ${pedidosTodos.length}`
                        : 'Cantidad de compras: -'}
                </Text>
                {loading ? (
                    <View>
                        <View style={{height: 15}} />
                        <ActivityIndicator size="large" color={Colors.White} />
                    </View>
                ) : (
                    <FlatList
                        style={{width: '100%', marginBottom: 15}}
                        data={pedidosUser}
                        renderItem={handleMisComprasItem}
                    />
                )}
            </View>
        );
    };
    const handleModalMisCompras = () => {
        return (
            <ModalMisCompras
                visible={modalMisCompras}
                onDismiss={() => setModalMisCompras(false)}
                onPressClose={() => setModalMisCompras(false)}
            />
        );
    };
    const handleModalTodasCompras = () => {
        if (modalTodasCompras) {
            return (
                <ModalTodasCompras
                    visible={modalTodasCompras}
                    onDismiss={() => setmodalTodasCompras(false)}
                    onPressClose={() => setmodalTodasCompras(false)}
                />
            );
        }
    };
    const handleNewOrderButton = () => {
        navigation.navigate('NEW_ORDERS');
        console.log('Token: ', accessToken);
        setSection(1);
        getTransporteTipo(accessToken);
        getRemitentes(accessToken);
        getProvincias(accessToken);
        getPlazos(accessToken);
        getComisionistas(accessToken);
        getDestinos(accessToken);
        getTransportes(accessToken);
        getAnimales(accessToken);
        getPedidoDetalleTipoParametro(accessToken);
    };
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.containerKAV}>
                <View style={styles.header}>
                    <Text style={styles.title}>Compras</Text>
                </View>
                <Animated.View style={{flex: 1}}>
                    {handleTitles()}
                    {handleLine()}
                    {selected === 0 && (
                        <Animated.View
                            style={[
                                {
                                    flex: 1,
                                    transform: [{translateX: translateTodas}],
                                },
                            ]}>
                            {handleCompras()}
                        </Animated.View>
                    )}
                    {selected === 1 && (
                        <Animated.View
                            style={[
                                {
                                    flex: 1,
                                    transform: [
                                        {translateX: translateMisCompras},
                                    ],
                                },
                            ]}>
                            {handleMisCompras()}
                        </Animated.View>
                    )}
                </Animated.View>

                <View style={styles.NewOrderBtn}>
                    <Button
                        title="Nueva compra"
                        onPress={() => handleNewOrderButton()}
                        style={{backgroundColor: Colors.White}}
                        textStyle={{
                            color: Colors.DarkRed,
                            fontFamily: 'Poppins-Medium',
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
            {modalMisCompras ? handleModalMisCompras() : null}
            {handleModalTodasCompras()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {height: -2, width: 0},
        shadowRadius: 1,
        shadowOpacity: 0.2,
    },
    header: {
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        fontSize: 30,
    },
    options: {
        marginTop: responsiveHeight(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: WIDTH,
        alignSelf: 'center',
    },
    handler: {
        flex: 1,
        height: '100%',
        width: responsiveWidth(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    handlerContent: {
        flex: 1,
        width: responsiveWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtHandler: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: responsiveFontSize(2.4),
        color: Colors.White,
    },
    containerLine: {
        alignSelf: 'center',
        width: WIDTH * 0.9,
        marginTop: 10,
    },
    line: {
        height: 3,
        width: responsiveWidth(80),
    },
    selectedLine: {
        borderRadius: 45,
        height: 3,
        width: responsiveWidth(40),
        backgroundColor: Colors.Orange,
    },
    containerKAV: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    containerContent: {
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
        height: HEIGHT * 0.65,
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        color: '#424242',
    },
    NewOrderBtn: {
        marginBottom: 10,
        alignItems: 'center',
    },
});

const OrdersContainer = (props) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.Red}}>
            <OrdersScreen {...props} />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    loading: state.orders.loading,
    compras: state.orders.compras,
    mis_compras: state.orders.mis_compras,
    pedidosTodos: state.orders.pedidosTodos,
    pedidosUser: state.orders.pedidosUser,
    pedidosTodosItemSelected: state.orders.pedidosTodosItemSelected,
    accessToken: state.login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
    setSection: (section) => {
        dispatch(OrderActions.setSection(section));
    },
    setCompras: (compra) => {
        dispatch(OrderActions.setCompras(compra));
    },
    setMyCompras: (compra) => {
        dispatch(OrderActions.setMyCompras(compra));
    },
    getCompras: (compra) => {
        dispatch(OrderActions.getCompras(compra));
    },
    getMyCompras: (compra) => {
        dispatch(OrderActions.getMyCompras(compra));
    },
    getRemitentes: (accessToken) => {
        dispatch(Section1Actions.getRemitentes(accessToken));
    },
    getProvincias: (accessToken) => {
        dispatch(Section1Actions.getProvincias(accessToken));
    },
    getPlazos: (accessToken) => {
        dispatch(Section1Actions.getPlazos(accessToken));
    },
    getAnimales: (accessToken) => {
        dispatch(Section2Actions.getAnimales(accessToken));
    },
    getPedidoDetalleTipoParametro: (accessToken) => {
        dispatch(Section2Actions.getPedidoDetalleTipoParametro(accessToken));
    },
    getDestinos: (accessToken) => {
        dispatch(Section3Actions.getDestinos(accessToken));
    },
    getComisionistas: (accessToken) => {
        dispatch(Section3Actions.getComisionistas(accessToken));
    },
    getTransportes: (accessToken) => {
        dispatch(Section4Actions.getTransportes(accessToken));
    },
    getTransporteTipo: (accessToken) => {
        dispatch(Section4Actions.getTransporteTipo(accessToken));
    },
    getPedidosTodos: (accessToken) => {
        dispatch(OrderActions.getPedidosTodos(accessToken));
    },
    setSelectedItemPedidosTodos: (item) => {
        dispatch(OrderActions.setSelectedItemPedidosTodos(item));
    },
    setSelectedItemPedidosByUser: (item) => {
        dispatch(OrderActions.setSelectedItemPedidosByUser(item));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
