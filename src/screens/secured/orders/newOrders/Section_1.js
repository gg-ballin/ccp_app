/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Text,
} from 'react-native';
import Button from '../../../../components/buttons/Button';
import SearchButton from '../../../../components/buttons/SearchButton';
// import Text from '../../../../components/textfields/TextCustom';
import {Colors} from '../../../../theme/index';
import {connect} from 'react-redux';
import {OrderActions, Section1Actions} from '../../../../redux/actions';
import Modal from '../../../../components/modal/Modal';
import Input from '../../../../components/inputs/Input';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const FirstSection = ({
    loading,
    //remitente
    remitente,
    remitenteSearched,
    remitenteSelected,
    setSearchRemitente,
    setSelectedRemitente,
    addRemitente,
    getRemitentes,
    //provincias
    provincias,
    provinciaSelected,
    setProvincia,
    // Localidades
    getLocalidades,
    setSelectedLocalidad,
    setSearchLocalidades,
    localidades,
    localidadSearched,
    localidadSelected,
    //plazos
    plazos,
    plazoOther,
    plazoSelected,
    setPlazoSelected,
    setOtherPlazo,
    setOtherPlazoId,
    setSection,
    //Token
    accessToken,
}) => {
    const [plazosModal, setPlazosModal] = useState(false);
    const [remitenteModal, setRemitenteModal] = useState(false);
    const [provinciaModal, setProvinciaModal] = useState(false);
    const [localidadModal, setLocalidadModal] = useState(false);
    const inputRef = useRef(null);

    const handleMarginTopPlazos = () => {
        const isX =
            Platform.OS === 'ios' && (HEIGHT > 800 || WIDTH > 800)
                ? true
                : false;
        if (isX) {
            return 20;
        } else {
            if (Platform.OS === 'ios') {
                return 3;
            } else {
                return 15;
            }
        }
    };
    const showRemitenteModal = () => {
        const filteredData = remitenteSearched
            ? remitente.filter((remit) =>
                  remit.Descripcion.toLowerCase().includes(
                      remitenteSearched.toLowerCase(),
                  ),
              )
            : remitente;
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={remitenteModal}
                    title="Buscá el remitente"
                    height="75%"
                    button={true}
                    onPress={() => {
                        setRemitenteModal(false);
                    }}
                    onCloseModal={() => {
                        setSearchRemitente('');
                        setRemitenteModal(false);
                    }}>
                    <Input
                        value={remitenteSearched}
                        autoFocus={true}
                        onChangeText={(text) => setSearchRemitente(text)}
                        style={styles.modalInputStyles}
                        placeholder="Buscar"
                    />
                    <View style={{marginTop: 15, marginBottom: 115}}>
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
                                            setSelectedRemitente(item);
                                            setRemitenteModal(false);
                                        }}>
                                        <Text style={styles.descriptionStyle}>
                                            {item.Descripcion}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        {filteredData.length < 7 ? (
                            <Button
                                title="Agregar remitente"
                                style={{
                                    width: '63%',
                                    alignSelf: 'center',
                                    marginTop: 15,
                                }}
                                textStyle={{color: Colors.White}}
                                onPress={() => {
                                    addRemitente(
                                        remitenteSearched,
                                        accessToken,
                                    );
                                    getRemitentes(accessToken);
                                    setRemitenteModal(false);
                                    setSearchRemitente('');
                                }}
                            />
                        ) : null}
                    </View>
                </Modal>
            </View>
        );
    };
    const showProvinciaModal = () => {
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={provinciaModal}
                    title="Seleccioná la provincia"
                    height="75%"
                    textButton="Cancelar"
                    button={true}
                    onPress={() => {
                        setProvinciaModal(false);
                    }}
                    onCloseModal={() => setProvinciaModal(false)}>
                    <View style={{marginBottom: 115}}>
                        <FlatList
                            data={provincias}
                            renderItem={handleProvincias}
                        />
                    </View>
                </Modal>
            </View>
        );
    };
    const handleProvincias = ({item}) => {
        const cat =
            item.Descripcion === 'Catamarca'
                ? 'Catamarca \n'
                : item.Descripcion;
        return (
            <TouchableOpacity
                style={styles.btnModalSelect}
                onPress={() => {
                    setProvincia(item);
                    getLocalidades(item.Id, accessToken);
                    setProvinciaModal(false);
                }}>
                <Text
                    style={{
                        alignSelf: 'center',
                        marginTop: 10,
                        fontFamily: 'Poppins-SemiBold',
                    }}>
                    {cat ? cat : item.Descripcion}
                </Text>
            </TouchableOpacity>
        );
    };
    const showLocalidadModal = () => {
        const filteredData = localidadSearched
            ? localidades.filter((loc) =>
                  loc.Descripcion.toLowerCase().includes(
                      localidadSearched.toLowerCase(),
                  ),
              )
            : localidades;
        return (
            <View style={styles.containerModal}>
                <Modal
                    modalVisible={localidadModal}
                    title="Seleccioná la localidad"
                    height="75%"
                    textButton="Cancelar"
                    button={true}
                    onPress={() => {
                        setSearchLocalidades('');
                        setLocalidadModal(false);
                    }}
                    onCloseModal={() => setLocalidadModal(false)}>
                    <Input
                        value={localidadSearched}
                        autoFocus={true}
                        onChangeText={(text) => setSearchLocalidades(text)}
                        style={styles.modalInputStyles}
                        placeholder="Buscar"
                    />
                    <View style={{height: 15}} />
                    <View style={{marginBottom: 115}}>
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
                                            setSelectedLocalidad(item);
                                            setSearchLocalidades('');
                                            setLocalidadModal(false);
                                        }}>
                                        <Text style={styles.descriptionStyle}>
                                            {item.Descripcion}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </Modal>
            </View>
        );
    };
    const handleSelectPlazoItem = (plazo) => {
        if (plazo.Descripcion === 'Otro') {
            inputRef.current.focus();
            debugger;
            setOtherPlazoId(plazo.Id);
        } else {
            setPlazoSelected(plazo);
            setOtherPlazo('');
            setPlazosModal(false);
        }
    };
    const handlePlazoSelectedText = () => {
        if (plazoSelected) {
            if (plazoOther) {
                return plazoOther;
            } else {
                return plazoSelected.Descripcion;
            }
        }
    };
    const showPlazosModal = () => {
        console.log('plazos: ', plazos);
        console.log('Plazo Other: ', plazoOther);
        return (
            <View style={styles.containerModal}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <Modal
                        modalVisible={plazosModal}
                        title="Elegí una opción"
                        height={plazos !== 'Otro' ? '60%' : '63%'}
                        button={true}
                        onPress={() => {
                            if (plazoSelected || plazoOther) {
                                Keyboard.dismiss();
                                setPlazosModal(false);
                            } else {
                                return null;
                            }
                        }}
                        onCloseModal={() => setPlazosModal(false)}>
                        <TextInput
                            ref={inputRef}
                            value={plazoOther}
                            focusable={plazoSelected === 4 ? true : false}
                            onChangeText={(text) => setOtherPlazo(text)}
                            style={[
                                styles.modalInputStyles,
                                styles.modalInputStyles2,
                            ]}
                            placeholderTextColor={Colors.White}
                            placeholder="Escriba aquí"
                            keyboardType="number-pad"
                        />
                        <View style={{marginTop: 15, marginBottom: 115}}>
                            <FlatList
                                data={plazos}
                                renderItem={({item}) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.btnModalSelect}
                                            onPress={() =>
                                                handleSelectPlazoItem(item)
                                            }>
                                            <Text
                                                style={styles.descriptionStyle}>
                                                {item.Descripcion}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
            </View>
        );
    };
    // console.log('remitenteSearched: ', remitenteSearched);
    // console.log('Localidad Selected: ', localidadSelected);
    const handleRemitenteButton = () => {
        if (loading) {
            return <ActivityIndicator size="large" color={Colors.White} />;
        } else {
            return (
                <SearchButton
                    searched={
                        remitenteSelected
                            ? remitenteSelected.Descripcion
                            : remitenteSearched
                    }
                    onPress={() => setRemitenteModal(true)}
                />
            );
        }
    };
    const handleProvinciaButton = () => {
        if (loading) {
            return <ActivityIndicator size="large" color={Colors.White} />;
        } else {
            return (
                <SearchButton
                    searched={
                        provinciaSelected ? provinciaSelected.Descripcion : null
                    }
                    onPress={() => setProvinciaModal(true)}
                />
            );
        }
    };
    const handleNextButton = () => {
        if (remitente.length > 2 && provincias.length > 2) {
            setSection(2);
        } else {
            return null;
        }
    };
    return (
        <View style={styles.ContentContainer}>
            <View style={styles.TitleContainer}>
                <Text style={styles.Title}>Primera Sección</Text>
                <Text style={styles.part}>Parte 1 de 5</Text>
            </View>
            <View style={styles.searchSection}>
                <Text style={styles.titleItem}>Remitente</Text>
                {handleRemitenteButton()}
                <View style={{height: 15}} />
                <Text style={styles.titleItem}>Provincia</Text>
                {handleProvinciaButton()}
                <View style={{height: 15}} />
                {localidades.length > 1 ? (
                    <>
                        <Text style={styles.titleItem}>Localidad</Text>
                        <SearchButton
                            searched={
                                !provinciaSelected && !localidadSelected
                                    ? 'Elija la provincia primero'
                                    : localidadSelected.Descripcion
                            }
                            onPress={() =>
                                provinciaSelected
                                    ? setLocalidadModal(true)
                                    : setLocalidadModal(false)
                            }
                        />
                    </>
                ) : null}
            </View>
            <View style={styles.pickerContainer}>
                <Button
                    style={{width: '90%', backgroundColor: Colors.White}}
                    title="Plazos"
                    onPress={() => setPlazosModal(true)}
                />
                <View
                    style={{width: '75%', marginTop: handleMarginTopPlazos()}}>
                    <Text style={[styles.plazosStyle]}>
                        {'Plazo seleccionado: ' + handlePlazoSelectedText()}
                    </Text>
                </View>
            </View>
            {plazosModal ? showPlazosModal() : null}
            {remitenteModal ? showRemitenteModal() : null}
            {provinciaModal ? showProvinciaModal() : null}
            {localidadModal ? showLocalidadModal() : null}
            <View style={styles.Next}>
                <Button
                    title="Siguiente"
                    style={{backgroundColor: Colors.Red}}
                    textStyle={{color: Colors.White}}
                    onPress={() => {
                        handleNextButton();
                    }}
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
        // justifyContent: 'space-evenly',
    },
    TitleContainer: {
        alignItems: 'center',
        width: '100%',
        height: 45,
        marginTop: 20,
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
    searchSection: {
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop: 55,
    },
    titleItem: {
        fontFamily: 'Poppins-Regular',
        color: Colors.White,
        marginBottom: 10,
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
        // backgroundColor: 'green',
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.Orange,
    },
    containerAll: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    modalInputStyles: {
        backgroundColor: Colors.Hint,
        color: Colors.White,
    },
    modalInputStyles2: {
        borderRadius: 12,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.White,
        height: 50,
        padding: 15,
        width: '90%',
    },
    onClose: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
    },
    containerButtons: {
        width: '100%',
        height: '45%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
    },
    grayRectangle: {
        width: 40,
        height: 5,
        backgroundColor: '#d9d9d9',
        marginTop: 8,
        borderRadius: 10,
    },
    containerContentModal: {
        width: '90%',
        marginTop: 35,
    },
    pickerContainer: {
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 25 : 25,
    },
    pickerStyles: {
        backgroundColor: Colors.Gray,
        borderRadius: 12,
    },
    plazosStyle: {
        textAlign: 'center',
        // fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.White,
        fontSize: Platform.OS === 'ios' ? 18 : 15,
    },
    titleItemModal: {
        fontFamily: 'Poppins-Regular',
        color: Colors.Black,
    },
    descriptionStyle: {
        alignSelf: 'center',
        marginTop: 10,
        fontFamily: 'Poppins-SemiBold',
    },
    Next: {
        width: '90%',
        justifyContent: 'space-around',
        bottom: 20,
        position: 'absolute',
    },
});

const mapStateToProps = (state) => ({
    loading: state.section1.loading,
    remitente: state.section1.remitente,
    remitenteSearched: state.section1.remitenteSearched,
    remitenteSelected: state.section1.remitenteSelected,
    provincias: state.section1.provincias,
    provinciaSelected: state.section1.provinciaSelected,
    localidades: state.section1.localidades,
    localidadSearched: state.section1.localidadSearched,
    localidadSelected: state.section1.localidadSelected,
    plazos: state.section1.plazos,
    plazoOther: state.section1.plazoOther,
    plazoSelected: state.section1.plazoSelected,
    accessToken: state.login.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
    setSection: (section) => {
        dispatch(OrderActions.setSection(section));
    },
    setRemitente: (remitente) => {
        dispatch(Section1Actions.setRemitente(remitente));
    },
    setSelectedRemitente: (remitente) => {
        dispatch(Section1Actions.setSelectedRemitente(remitente));
    },
    setSearchRemitente: (remitente) => {
        dispatch(Section1Actions.setSearchRemitente(remitente));
    },
    addRemitente: (remitente, accessToken) => {
        dispatch(Section1Actions.addRemitente(remitente, accessToken));
    },
    getRemitentes: (accessToken) => {
        dispatch(Section1Actions.getRemitentes(accessToken));
    },
    setProvincia: (provincia) => {
        dispatch(Section1Actions.setProvincia(provincia));
    },
    getLocalidades: (id, accessToken) => {
        dispatch(Section1Actions.getLocalidades(id, accessToken));
    },
    setSelectedLocalidad: (localidad) => {
        dispatch(Section1Actions.setSelectedLocalidad(localidad));
    },
    setSearchLocalidades: (localidad) => {
        dispatch(Section1Actions.setSearchLocalidades(localidad));
    },
    setPlazos: (plazos) => {
        dispatch(Section1Actions.setPlazos(plazos));
    },
    setPlazoSelected: (plazo) => {
        dispatch(Section1Actions.setPlazoSelected(plazo));
    },
    setOtherPlazo: (plazo) => {
        dispatch(Section1Actions.setOtherPlazo(plazo));
    },
    setOtherPlazoId: (id) => {
        dispatch(Section1Actions.setOtherPlazoId(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstSection);
