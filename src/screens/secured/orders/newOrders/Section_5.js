/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Dimensions, TextInput, Text} from 'react-native';
import {Colors} from '../../../../theme/index';
import {connect} from 'react-redux';
import {OrderActions, Section5Actions} from '../../../../redux/actions';
import Button from '../../../../components/buttons/Button';
// import Text from '../../../../components/textfields/TextCustom';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const FifthSection = ({
    setSection,
    tipo_compra,
    setObservaciones,
    sendPedidoKgVivo,
    sendPedidoAlRinde,
    kgvivo_array,
    final_alrinde_array,
    al_rinde_send,
    transportesArray,
    remitenteSelected,
    destinoSelected,
    destinoFechaSelected,
    provinciaSelected,
    localidadSelected,
    comisionistaSelected,
    plazoSelected,
    plazoOther,
    plazoOtherId,
    observaciones,
    accessToken,
}) => {
    const handlePost = () => {
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
                debugger;
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
    };
    console.log('============================================');
    console.log('============================================');
    console.log('ALRINDESEND EN SECTION 5: ', al_rinde_send);
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
                        style={{
                            width: '95%',
                            height: '100%',
                            borderRadius: 5,
                            // textAlign: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            marginBottom: 8,
                        }}
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
                    style={{backgroundColor: Colors.Red, width: '45%'}}
                    textStyle={{color: Colors.White, fontSize: 20}}
                    onPress={() => setSection(4)}
                />
                <Button
                    title="Finalizar"
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
    accessToken: state.login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
    setSection: (section) => {
        dispatch(OrderActions.setSection(section));
    },
    setObservaciones: (remitente) => {
        dispatch(Section5Actions.setObservaciones(remitente));
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
