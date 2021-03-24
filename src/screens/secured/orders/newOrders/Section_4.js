/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    FlatList,
    Platform,
    Text,
} from 'react-native';
import Button from '../../../../components/buttons/Button';
import SearchButton from '../../../../components/buttons/SearchButton';
import Input from '../../../../components/inputs/Input';
// import Text from '../../../../components/textfields/TextCustom';
import {Colors} from '../../../../theme/index';
import {connect} from 'react-redux';
import {OrderActions, Section4Actions} from '../../../../redux/actions';
import Modal from '../../../../components/modal/Modal';
import {Keyboard} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const FourthSection = ({
    setSection,
    // Transporte
    transportes,
    transporteSearched,
    transporteSelected,
    transporteSelectedId,
    setSelectedTransporte,
    setSelectedTransporteId,
    setSearchTransporte,
    addTransporte,
    addNewTransporte,
    getTransportes,
    getTransporteTipoById,
    transportesJaulas,
    // Transporte Tipo
    transporteTipos,
    setTransporteTipo,
    transporteTipoSelected,
    transportePKM,
    transporteCantJaulas,
    setTransportePKM,
    setTransporteCantJaulas,
    transportesArray,
    // Token
    accessToken,
}) => {
    const [transporteModal, setTransporteModal] = useState(false);
    const [transporteTipoModal, setTransporteTipoModal] = useState(false);
    const [listTransporteModal, setListTransporteModal] = useState(false);

    const handleSelectTransporte = (item) => {
        setSelectedTransporte(item.Descripcion);
        setSelectedTransporteId(item.Id);
        getTransporteTipoById(item.Id, accessToken);
        setTransporteModal(false);
    };

    const showModalTransporte = () => {
        const filteredData = transporteSearched
            ? transportes.filter((transporte) =>
                  transporte.Descripcion.toLowerCase().includes(
                      transporteSearched.toLowerCase(),
                  ),
              )
            : transportes;
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={transporteModal}
                    title="Ingresá el transporte"
                    height="75%"
                    button={true}
                    onPress={() => {
                        setTransporteModal(false);
                    }}
                    onCloseModal={() => setTransporteModal(false)}>
                    <Input
                        value={transporteSearched}
                        autoFocus
                        onChangeText={(text) => setSearchTransporte(text)}
                        style={styles.modalInputStyles}
                        placeholder="Escriba aquí"
                    />
                    <View style={{marginBottom: 115, marginTop: 15}}>
                        <FlatList
                            data={filteredData}
                            ListEmptyComponent={
                                <Text>No se hallaron resultados</Text>
                            }
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.btnModalSelect}
                                        onPress={() => {
                                            handleSelectTransporte(item);
                                        }}>
                                        <Text
                                            text={item.Descripcion}
                                            style={{
                                                alignSelf: 'center',
                                                marginTop: 10,
                                            }}
                                            textStyle={{
                                                fontFamily: 'Poppins-SemiBold',
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        {filteredData.length === 0 ? (
                            <Button
                                title="Agregar transporte"
                                style={{
                                    width: '75%',
                                    alignSelf: 'center',
                                    marginTop: 15,
                                }}
                                textStyle={{color: Colors.White}}
                                onPress={() => {
                                    addTransporte(
                                        transporteSearched,
                                        accessToken,
                                    );
                                    setTransporteModal(false);
                                    setSearchTransporte('');
                                }}
                            />
                        ) : null}
                    </View>
                </Modal>
            </View>
        );
    };
    const handleTipoTransporte = (item) => {
        console.log('Item selected: ', item);
        setTransportePKM(item.PrecioKm);
        setTransporteTipo(item.TransporteTipo);
        setTransporteTipoModal(false);
    };
    const showModalTransporteTipo = () => {
        // debugger;
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={transporteTipoModal}
                    title={'Seleccioná el \n tipo de transporte'}
                    height="45%"
                    button={true}
                    onPress={() => {
                        setTransporteTipoModal(false);
                    }}
                    onCloseModal={() => setTransporteTipoModal(false)}>
                    <View style={{marginBottom: 115, marginTop: 25}}>
                        <FlatList
                            data={transportesJaulas}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => {
                                // console.log('item renderizados: ', item);
                                return (
                                    <TouchableOpacity
                                        style={styles.btnModalSelect}
                                        onPress={() => {
                                            handleTipoTransporte(item);
                                        }}>
                                        <Text
                                            text={item.TransporteTipo}
                                            style={{
                                                alignSelf: 'center',
                                                marginTop: 10,
                                            }}
                                            textStyle={{
                                                fontFamily: 'Poppins-SemiBold',
                                            }}
                                        />
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    };
    const renderTextInputs = () => {
        return (
            <View style={styles.containerInputs}>
                <View style={{width: '45%'}}>
                    <Text style={styles.titleItem}>Precio Km</Text>
                    <Input
                        placeholder="Escriba aquí"
                        placeholderStyle={Colors.Hint}
                        value={transportePKM ? transportePKM.toString() : ''}
                        style={{width: '100%'}}
                        keyboardType="number-pad"
                        onChangeText={(text) => setTransportePKM(text)}
                    />
                </View>
                <View style={{width: '45%'}}>
                    <Text style={styles.titleItem}>Cantidad Jaulas</Text>
                    <Input
                        placeholder="Escriba aquí"
                        placeholderStyle={Colors.Hint}
                        value={transporteCantJaulas}
                        style={{width: '100%'}}
                        keyboardType="number-pad"
                        onChangeText={(text) => setTransporteCantJaulas(text)}
                    />
                </View>
            </View>
        );
    };
    const showModalListTransporte = () => {
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={listTransporteModal}
                    title={'Transportes \nseleccionados'}
                    height="75%"
                    button={true}
                    onPress={() => {
                        setListTransporteModal(false);
                    }}
                    onCloseModal={() => setListTransporteModal(false)}>
                    <View style={{marginBottom: 115, marginTop: 25}}>
                        <FlatList
                            data={transportesArray}
                            renderItem={({item}) => {
                                return (
                                    <View
                                        style={{
                                            backgroundColor: Colors.Red,
                                            width: '100%',
                                            marginBottom: 10,
                                            borderRadius: 12,
                                            paddingTop: 7,
                                            paddingLeft: 12,
                                            height:
                                                Platform.OS === 'ios'
                                                    ? 95
                                                    : 110,
                                            flexDirection: 'column',
                                        }}>
                                        <View style={{}}>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'Poppins-SemiBold',
                                                    color: Colors.White,
                                                }}>
                                                Transporte: {item.Transporte}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'Poppins-SemiBold',
                                                    color: Colors.White,
                                                }}>
                                                Tipo de Transporte:
                                                {item.TransporteTipo}
                                            </Text>
                                        </View>
                                        <View style={{}}>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'Poppins-SemiBold',
                                                    color: Colors.White,
                                                }}>
                                                Precio KM:
                                                {item.PrecioKm}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'Poppins-SemiBold',
                                                    color: Colors.White,
                                                }}>
                                                Cantidad:
                                                {item.Cantidad}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    };
    // console.log('transportesArray: ', transportesArray);
    // console.log('transporteSelectedId: ', transporteSelectedId);
    // console.log('transporteTipoSelected: ', transporteTipoSelected);
    // console.log('transportePKM: ', transportePKM);
    // console.log('transporteCantJaulas: ', transporteCantJaulas);
    // console.log('-----------------------------------------------');
    const handleAddNewTransporte = () => {
        const transpSel = transporteSelected ? transporteSelected : false;
        const transpTipoSel =
            transporteTipoSelected.length > 1 ? transporteTipoSelected : false;
        const transpPKM = transportePKM ? transportePKM : false;
        const transpCantJau = transporteCantJaulas
            ? transporteCantJaulas
            : false;
        const id = transporteTipoSelected === 'Jaula Doble' ? 3 : 2;
        if (transpSel && transpTipoSel && transpPKM && transpCantJau) {
            addNewTransporte(
                transporteSelected, // Nombre del transporte
                transporteTipoSelected, // Tipo de Jaula
                id, // ID del transporte
                transporteSelectedId,
                transportePKM,
                transporteCantJaulas,
            );
            Keyboard.dismiss();
        } else {
            return;
        }
    };
    const handleSearchedTransporte = () => {
        if (transporteSelected) {
            return transporteSelected.Descripcion;
        } else {
            return '';
        }
    };
    const handleSearchedTransporteTipo = () => {
        if (transporteTipoSelected) {
            return transporteTipoSelected.Descripcion;
        } else {
            return '';
        }
    };
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={0}
            behavior={'padding'}
            style={styles.ContentContainer}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Cuarta Sección</Text>
                <Text style={styles.part}>Parte 4 de 5</Text>
            </View>

            <View style={styles.Transport}>
                <Text style={styles.titleItem}>Transporte</Text>
                <View style={{height: 10}} />
                <SearchButton
                    searched={handleSearchedTransporte()}
                    onPress={() => setTransporteModal(true)}
                />
            </View>
            <View style={styles.Transport}>
                <Text style={styles.titleItem}>Tipo de Jaula</Text>
                <View style={{height: 10}} />
                <SearchButton
                    searched={handleSearchedTransporteTipo()}
                    onPress={() => setTransporteTipoModal(true)}
                />
            </View>
            {renderTextInputs()}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    width: '100%',
                }}>
                <Button
                    title="Lista transporte"
                    onPress={() => setListTransporteModal(true)}
                    style={{
                        width: '53%',
                        height: 30,
                        marginBottom: 10,
                        backgroundColor: Colors.White,
                        borderWidth: 1,
                        borderColor: Colors.Red,
                    }}
                    textStyle={{color: Colors.Red}}
                />
                <Button
                    title="Agregar"
                    onPress={() => {
                        handleAddNewTransporte();
                    }}
                    style={{
                        width: '45%',
                        height: 30,
                        marginBottom: 10,
                        backgroundColor: Colors.Red,
                        borderWidth: 1,
                        borderColor: Colors.White,
                    }}
                    textStyle={{color: Colors.White}}
                />
            </View>
            <View />
            <View />
            <View />
            {listTransporteModal ? showModalListTransporte() : null}
            {transporteModal ? showModalTransporte() : null}
            {transporteTipoModal ? showModalTransporteTipo() : null}
            <View style={styles.Next}>
                <Button
                    title="Atrás"
                    style={{backgroundColor: Colors.Red, width: '45%'}}
                    textStyle={{color: Colors.White, fontSize: 20}}
                    onPress={() => setSection(3)}
                />
                <Button
                    title="Siguiente"
                    style={{backgroundColor: Colors.Red, width: '45%'}}
                    textStyle={{color: Colors.White, fontSize: 20}}
                    onPress={() => {
                        getTransportes(accessToken);
                        setSection(5);
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    ContentContainer: {
        // flex: 0,
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
    containerInputs: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchSection: {
        width: '90%',
    },
    titleItem: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        marginBottom: 5,
    },
    Transport: {
        width: '90%',
    },
    CirclesContainer: {
        width: '90%',
    },
    CircleItem: {
        flexDirection: 'row',
    },
    TitleSelect: {
        fontFamily: 'Poppins-Medium',
        color: Colors.White,
        marginLeft: 10,
    },
    Circle: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    InnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
    },
    pickerStyles: {
        backgroundColor: Colors.White,
        borderRadius: 12,
    },
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnModalSelect: {
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.Orange,
    },
    modalInputStyles: {
        backgroundColor: Colors.Hint,
        color: Colors.White,
    },
    Next: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        bottom: 20,
        position: 'absolute',
    },
});

const mapStateToProps = (state) => ({
    transportes: state.section4.transportes,
    transporteSearched: state.section4.transporteSearched,
    transporteSelected: state.section4.transporteSelected,
    transporteSelectedId: state.section4.transporteSelectedId,
    transporteTipos: state.section4.transporteTipos,
    transporteTipoSelected: state.section4.transporteTipoSelected,
    transportePKM: state.section4.transportePKM,
    transporteCantJaulas: state.section4.transporteCantJaulas,
    transportesArray: state.section4.transportesArray,
    transportesJaulas: state.section4.transportesJaulas,
    accessToken: state.login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
    setSection: (section) => {
        dispatch(OrderActions.setSection(section));
    },
    setSelectedTransporte: (transporte) => {
        dispatch(Section4Actions.setSelectedTransporte(transporte));
    },
    setSelectedTransporteId: (transpId) => {
        dispatch(Section4Actions.setSelectedTransporteId(transpId));
    },
    setSearchTransporte: (transporte) => {
        dispatch(Section4Actions.setSearchTransporte(transporte));
    },
    addTransporte: (transporte, accessToken) => {
        dispatch(Section4Actions.addTransporte(transporte, accessToken));
    },
    getTransporteTipoById: (transporteId, accessToken) => {
        dispatch(
            Section4Actions.getTransporteTipoById(transporteId, accessToken),
        );
    },
    getTransportes: (accessToken) => {
        dispatch(Section4Actions.getTransportes(accessToken));
    },
    addNewTransporte: (
        transporte,
        tipoDeJaula,
        transporteTipoId,
        transporteId,
        PKM,
        cantJaulas,
    ) => {
        dispatch(
            Section4Actions.addNewTransporte(
                transporte,
                tipoDeJaula,
                transporteTipoId,
                transporteId,
                PKM,
                cantJaulas,
            ),
        );
    },
    setTransporteTipo: (text) => {
        dispatch(Section4Actions.setTransporteTipo(text));
    },
    setTransportePKM: (text) => {
        dispatch(Section4Actions.setTransportePKM(text));
    },
    setTransporteCantJaulas: (text) => {
        dispatch(Section4Actions.setTransporteCantJaulas(text));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FourthSection);
