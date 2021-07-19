/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Dimensions, TextInput, Text} from 'react-native';
import {Colors} from '../../../../theme/index';
import {connect} from 'react-redux';
import {OrderActions, Section5Actions} from '../../../../redux/actions';
import Button from '../../../../components/buttons/Button';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const FifthSection = ({
    setSection,
    remitenteSelected, // seccion 1
    provinciaSelected, // seccion 1
    localidadSelected, // seccion 1
    plazoSelected, // seccion 1
    plazoOther, // seccion 1
    plazoOtherId, // seccion 1
    tipo_compra, // seccion 2
    sendPedidoKgVivo, // seccion 2
    sendPedidoAlRinde, // seccion 2
    kgvivo_array, // seccion 2
    al_rinde_send, // seccion 2
    destinoSelected, // seccion 3
    destinoFechaSelected, // seccion 3
    comisionistaSelected, // seccion 3
    transportesArray, // seccion 4
    observaciones, // seccion 5
    setObservaciones, // seccion 5
    setModalNoData, // seccion 5
    loading, //seccion 5
    accessToken,
}) => {
    const handlePost = () => {
        // eslint-disable-next-line prettier/prettier
        const checkLength = (object) => {
            return Object.keys(object).length !== 0;
        };
        const section1 =
            checkLength(remitenteSelected) &&
            checkLength(provinciaSelected) &&
            checkLength(plazoSelected);
        const section2 =
            kgvivo_array.length !== 0 || al_rinde_send.length !== 0;
        const section3 = checkLength(destinoFechaSelected);
        if (!section1 || !section2 || !section3) {
            setModalNoData(true);
        } else {
            if (tipo_compra !== 'alrinde') {
                let comisio =
                    Object.keys(comisionistaSelected).length === 0
                        ? ''
                        : comisionistaSelected.Id;
                if (plazoOther !== '') {
                    // si le puso un plazo distinto a los que trae por API.
                    sendPedidoKgVivo(
                        kgvivo_array,
                        transportesArray,
                        remitenteSelected.Id,
                        destinoSelected.Id,
                        destinoFechaSelected,
                        provinciaSelected.Id,
                        localidadSelected.Id,
                        comisio,
                        plazoOtherId,
                        plazoOther,
                        observaciones,
                        accessToken,
                    );
                } else {
                    sendPedidoKgVivo(
                        kgvivo_array,
                        transportesArray,
                        remitenteSelected.Id,
                        destinoSelected.Id,
                        destinoFechaSelected,
                        provinciaSelected.Id,
                        localidadSelected.Id,
                        comisio,
                        plazoSelected.Id,
                        '',
                        observaciones,
                        accessToken,
                    );
                }
            } else {
                let comisio =
                    Object.keys(comisionistaSelected).length === 0
                        ? ''
                        : comisionistaSelected.Id;
                if (plazoOther !== '') {
                    // aca tendria que ir un campo de plazoselected.id cuando viene plazoOther.
                    sendPedidoAlRinde(
                        al_rinde_send,
                        transportesArray,
                        remitenteSelected.Id,
                        destinoSelected.Id,
                        destinoFechaSelected,
                        provinciaSelected.Id,
                        localidadSelected.Id,
                        comisio,
                        plazoOtherId,
                        plazoOther,
                        observaciones,
                        accessToken,
                    );
                } else {
                    sendPedidoAlRinde(
                        al_rinde_send,
                        transportesArray,
                        remitenteSelected.Id,
                        destinoSelected.Id,
                        destinoFechaSelected,
                        provinciaSelected.Id,
                        localidadSelected.Id,
                        comisio,
                        plazoSelected.Id,
                        '',
                        observaciones,
                        accessToken,
                    );
                }
            }
        }
    };
    return (
        <View style={styles.ContentContainer}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Quinta Sección</Text>
                <Text style={styles.part}>Parte 5 de 5</Text>
            </View>
            <View style={{width: '90%', alignItems: 'flex-start'}}>
                <Text style={styles.titleItem}>Observaciones</Text>
                <View style={styles.containerTextInput}>
                    <TextInput
                        placeholder="Escriba aquí"
                        placeholderTextColor={Colors.Hint}
                        value={observaciones}
                        numberOfLines={5}
                        style={styles.textInput}
                        onChangeText={(text) => setObservaciones(text)}
                    />
                </View>
            </View>
            <View />
            <View />
            <View />
            <View style={styles.Next}>
                <Button
                    title="Atrás"
                    disabled={loading}
                    style={{
                        backgroundColor: loading ? Colors.Hint : Colors.Red,
                        width: '45%',
                    }}
                    textStyle={{
                        color: loading ? Colors.Red : Colors.White,
                        fontSize: 20,
                    }}
                    onPress={() => setSection(4)}
                />
                <Button
                    title="Finalizar"
                    loading={loading}
                    style={{backgroundColor: Colors.White, width: '45%'}}
                    textStyle={{color: Colors.Red, fontSize: 20}}
                    onPress={() => handlePost()}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ContentContainer: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.85,
        backgroundColor: Colors.Hint,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    TitleContainer: {
        alignItems: 'center',
        width: '100%',
        height: 45,
        top: -20,
    },
    Title: {
        fontFamily: 'Poppins-Medium',
        fontSize: 30,
        color: Colors.White,
    },
    part: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
    },
    titleItem: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        marginBottom: 15,
    },
    containerTextInput: {
        backgroundColor: Colors.White,
        borderRadius: 20,
        width: '100%',
        height: 150,
        paddingTop: 10,
        paddingLeft: 10,
    },
    textInput: {
        width: '95%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginBottom: 8,
    },
    Next: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        bottom: 20,
        position: 'absolute',
    },
});

const mapStateToProps = (state) => ({
    remitenteSelected: state.section1.remitenteSelected,
    provinciaSelected: state.section1.provinciaSelected,
    localidadSelected: state.section1.localidadSelected,
    plazoSelected: state.section1.plazoSelected,
    plazoOther: state.section1.plazoOther,
    plazoOtherId: state.section1.plazoOtherId,
    kgvivo_array: state.section2.kgvivo_array,
    al_rinde_array: state.section2.al_rinde_array,
    tipo_compra: state.section2.tipo_compra,
    final_alrinde_array: state.section2.final_alrinde_array,
    al_rinde_send: state.section2.al_rinde_send,
    comisionistaSelected: state.section3.comisionistaSelected,
    destinoFechaSelected: state.section3.destinoFechaSelected,
    destinoSelected: state.section3.destinoSelected,
    transportesArray: state.section4.transportesArray,
    observaciones: state.section5.observaciones,
    loading: state.section5.loading,
    accessToken: state.login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
    setSection: (section) => {
        dispatch(OrderActions.setSection(section));
    },
    setObservaciones: (remitente) => {
        dispatch(Section5Actions.setObservaciones(remitente));
    },
    setModalNoData: (bool) => {
        dispatch(Section5Actions.setModalNoData(bool));
    },
    sendPedidoKgVivo: (
        kgVivoList,
        pedidoTransportesList,
        remitenteId,
        destinoId,
        fecha,
        provinciaId,
        localidadId,
        comisionistaId,
        condicionPagoId,
        plazoOther,
        observaciones,
        accessToken,
    ) => {
        dispatch(
            Section5Actions.sendPedidoKgVivo(
                kgVivoList,
                pedidoTransportesList,
                remitenteId,
                destinoId,
                fecha,
                provinciaId,
                localidadId,
                comisionistaId,
                condicionPagoId,
                plazoOther,
                observaciones,
                accessToken,
            ),
        );
    },
    sendPedidoAlRinde: (
        alRindeList,
        pedidoTransportesList,
        remitenteId,
        destinoId,
        fecha,
        provinciaId,
        localidadId,
        comisionistaId,
        condicionPagoId,
        plazoOther,
        observaciones,
        accessToken,
    ) => {
        dispatch(
            Section5Actions.sendPedidoAlRinde(
                alRindeList,
                pedidoTransportesList,
                remitenteId,
                destinoId,
                fecha,
                provinciaId,
                localidadId,
                comisionistaId,
                condicionPagoId,
                plazoOther,
                observaciones,
                accessToken,
            ),
        );
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FifthSection);
